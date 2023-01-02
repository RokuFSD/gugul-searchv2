import React from "react";
import CrossSvg from "../svgs/CrossSvg";
import toggleState from "../../services/toggleState";

function MenuClose() {
  return (
    <button
      className="absolute right-2 top-2"
      type="button"
      onClick={() => toggleState.setSubject(true)}
    >
      <CrossSvg />
    </button>
  );
}

export default MenuClose;
