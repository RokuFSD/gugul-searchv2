import React from "react";
import GoogleSvg from "../../svgs/GoogleSvg";
import GitHubSvg from "../../svgs/GitHubSvg";

const icons = {
  google: <GoogleSvg />,
  github: <GitHubSvg />
};


export type IconAuth = keyof typeof icons

type AuthIconProps = {
  icon: IconAuth
}


function AuthIcon({ icon }: AuthIconProps) {
  return icons[icon];
}

export default AuthIcon;