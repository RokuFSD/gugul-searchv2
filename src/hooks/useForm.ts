/* eslint-disable react-hooks/exhaustive-deps,react-hooks/rules-of-hooks */
import { FormEvent, useCallback, useRef, useSyncExternalStore } from "react";
import { ValidationArr, ErrorType } from "../types/form";

function validate<T>(validationsArr: ValidationArr[], values: T) {
  const anyErrors = validationsArr.reduce(
    (prevValidation, currentValidation) => {
      if (typeof currentValidation(values) === "object") {
        prevValidation.push(currentValidation(values) as ErrorType);
      }
      return prevValidation;
    },
    [] as ErrorType[]
  );

  return {
    isValid: anyErrors.length === 0,
    errors: anyErrors.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
  };
}

function useForm<T>(
  initialValues: T,
  onSubmit: (...args: any[]) => unknown,
  validations?: ValidationArr[]
) {
  const { isValid: initialIsValid, errors: initialErrors } = validate(
    validations || [],
    initialValues
  );

  const values = useRef<T>(initialValues);
  const isValid = useRef(initialIsValid);
  const formErrors = useRef<ErrorType>(initialErrors);
  const subscribers = useRef(new Set<() => void>());

  const get = useCallback(() => values.current, []);

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  const changeValuesCallback = useCallback((value: Partial<T>) => {
    values.current = { ...values.current, ...value };
    if (validations && validations?.length) {
      const { isValid: valid, errors: arrErrors } = validate(validations, {
        ...values.current,
        ...value,
      });
      formErrors.current = arrErrors;
      isValid.current = valid;
    } else {
      formErrors.current = {};
    }
    subscribers.current.forEach((callback) => callback());
  }, []);

  const useValue = useCallback(
    <SelectorOutput>(selector: (store: T) => SelectorOutput) => {
      const state = useSyncExternalStore(subscribe, () => selector(get()));
      return [state, changeValuesCallback];
    },
    []
  );

  const selectIsValid = useCallback(
    () => useSyncExternalStore(subscribe, () => isValid.current),
    []
  );

  const selectError = useCallback(
    (key: string) =>
      useSyncExternalStore(subscribe, () => formErrors.current[key]),
    []
  );

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
    const data = new FormData(e.currentTarget);
    // We are using redux here for the error handling because the logic is in thunk actions
    const result = await onSubmit(Object.fromEntries(data.entries()));
    // Check if result is an instance of Thunk
    if (result && typeof result === "object" && "payload" in result) {
      const payload = result.payload as {
        message: string;
        type: string;
      };
      formErrors.current[payload.type] = payload.message;
    }
    subscribers.current.forEach((callback) => callback());
  }, []);

  return {
    useValue,
    selectIsValid,
    selectError,
    handleSubmit,
  };
}

export default useForm;
