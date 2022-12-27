/* eslint-disable react/require-default-props */
import React, { ReactNode } from "react";
import useForm from "../../hooks/useForm";
import { IFormInput } from "./FormInput";
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
};

function Form<T>({
  initialValues,
  validations,
  children,
  className,
  onSubmit,
}: IForm) {
  const { selectIsValid, useValue, selectError, handleSubmit } = useForm<T>(
    initialValues as T,
    onSubmit,
    validations
  );
  const canSubmit = selectIsValid();

  return (
    <form className={className} name="form" onSubmit={handleSubmit}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === FormSubmit) {
            return React.cloneElement(child, {
              disabled: !canSubmit,
            } as { disabled: boolean });
          }
          return React.cloneElement(child, {
            valueSelector: useValue,
            errorSelector: selectError,
          } as IFormInput<T>);
        }
        return child;
      })}
    </form>
  );
}

export default Form;
