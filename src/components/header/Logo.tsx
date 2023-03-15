/* eslint-disable react/no-unused-prop-types,react/require-default-props */
import React from "react";
import { Link } from "react-router-dom";
import classSelector from "../../utils/classSelector";

type LogoProps = {
  triggeredSearch?: boolean;
  onNav?: boolean;
}

const baseLogoStyles = [
  "logo",
  "z-[1000]"
];

const variants = {
  searched: [
    "top-0",
    "xl:absolute",
    "xl:top-[unset]",
    "xl:left-0"
  ],
  idle: [
    "-mt-20"
  ]
};

function Logo({ triggeredSearch = false }: LogoProps) {
  const classes = classSelector(baseLogoStyles, variants);
  return (
    <Link to="/" className={classes(triggeredSearch ? "searched" : "idle")}>Gügül</Link>
  );
}

export default Logo;