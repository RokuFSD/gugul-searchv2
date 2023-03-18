import React from "react";
import AuthIcon, { IconAuth } from "./AuthIcon";
import classSelector from "../../../utils/classSelector";

type AuthOptionProps = {
  signInCb: () => void
  // eslint-disable-next-line react/require-default-props
  icon?: IconAuth
  // eslint-disable-next-line react/no-unused-prop-types
  disabled?: boolean
  type: "register" | "login"

  name: string
}

const message = {
  register: "Register with ",
  login: "Login in with "
};

const baseClass = [
  "w-full",
  "duration-200",
  "rounded",
  "px-2", "py-1",
  "text-black",
  "shadow-lg",
  "border",
  "border-neutral-500",
  "transition-colors"
];

const classVariants = {
  working: [
    "bg-neutral-200",
    "hover:border-blue-500",
    "hover:text-blue-500"
  ],
  disabled: [
    "bg-neutral-400",
    "cursor-default"
  ]
};

function AuthOption({ signInCb, icon, type, name, disabled }: AuthOptionProps) {
  const classes = classSelector(baseClass, classVariants);
  return (
    <div className="w-full flex justify-center">
      <button type="button"
              className={classes(disabled ? "disabled" : "working")}
              onClick={() => signInCb()}
              disabled={disabled}
      >
        <div className="flex justify-center">
          {icon && (
            <AuthIcon icon={icon} />
          )}
          <div className="w-full">
            {message[type]}
            {name}
          </div>
        </div>
      </button>
    </div>
  );
}

export default AuthOption;