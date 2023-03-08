import React from "react";
import classSelector from "../../utils/classSelector";

type LogoProps = {
  triggeredSearch: boolean;
}

const baseLogoStyles = [
  "logo"
];

const variants = {
  searched: [
    "top-0",
    "md:absolute",
    "xl:top-[unset]",
    "xl:left-0"
  ]
};

function Logo({ triggeredSearch }: LogoProps) {
  const classes = classSelector(baseLogoStyles, variants);
  return (
    <h2 className={classes(triggeredSearch ? "searched" : "")}>Gugul</h2>
  );
}

export default Logo;