import React from "react";

function SearchLoader() {
  return (
    <div className="w-full flex top-0 absolute z-50 h-full items-center justify-center" aria-busy="true"
         aria-label="loader">
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </div>
  );
}

export default SearchLoader;
