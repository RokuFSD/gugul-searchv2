/* eslint-disable react/require-default-props */
import React, { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";

export type IFormInput<T> = {
  name: string; // Change this to accept only keys in the store context
  type: HTMLInputTypeAttribute;
  placeholder: string;
  valueSelector?: <SelectorOutput>(
    selector: (state: any) => SelectorOutput
  ) => (((value: Partial<T>) => void) | SelectorOutput)[];
  errorSelector?: (key: string) => string;
  className?: string;
  required?: boolean;
};

function FormInput<T>({
  name,
  type,
  placeholder,
  valueSelector,
  errorSelector,
  className,
  required,
}: IFormInput<T>) {
  if (!valueSelector || !errorSelector) {
    throw new Error("FormInput must be used inside a Form component");
  }
  const [value, setValue] = valueSelector((state: any) => state[name]);
  const [touch, setTouch] = useState(false);
  const error = errorSelector(name);
  return (
    <>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(evt: ChangeEvent<HTMLInputElement>) =>
          setValue({
            [name]: evt.target.value,
          })
        }
        data-state={error && touch ? "error" : "idle"}
        placeholder={placeholder}
        className={className}
        onBlur={() => setTouch(true)}
        required={required}
      />
      <span data-error={error}>
        <span />
      </span>
    </>
  );
}

export default FormInput;
