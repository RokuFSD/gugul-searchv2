import React from "react";

function SearchLoader() {
  return (
    <div className="w-full flex top-0 absolute h-full items-center justify-center -z-50" aria-busy="true"
         aria-label="loader">
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </div>
  );
}

export default SearchLoader;
