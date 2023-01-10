/* eslint-disable react/require-default-props */
import React, { ReactNode } from "react";
import useForm from "../../hooks/useForm";
import FormInput, { IFormInput } from "./FormInput";
import { ValidationArr } from "../../types/form";
import FormSubmit from "./FormSubmit";

type IForm = {
  initialValues: {
    [key: string]: string;
  };
  children: ReactNode;
  onSubmit: (...args: any[]) => unknown;
  className?: string;
  validations?: ValidationArr[];
  path?: string;
};

function Form<T>({
  initialValues,
  validations,
  children,
  className,
  onSubmit,
  path,
}: IForm) {
  const { selectIsValid, useValue, selectError, handleSubmit } = useForm<T>(
    initialValues as T,
    onSubmit,
    validations,
    path
  );
  const canSubmit = selectIsValid();
  const formError = selectError("form");
  return (
    <form className={className} name="form" onSubmit={handleSubmit}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === FormSubmit) {
            return React.cloneElement(child, {
              disabled: !canSubmit,
            } as { disabled: boolean; loading: boolean });
          }
          if (child.type === FormInput) {
            return React.cloneElement(child, {
              valueselector: useValue,
              errorselector: selectError,
            } as IFormInput<T>);
          }
        }
        return child;
      })}
      {formError && <span>formError</span>}
    </form>
  );
}

export default Form;
