import React from "react";

function Spinner() {
  return (
    <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1zm0 0h1v1a7 7 0 007 7v1a8 8 0 01-8-8zm0 0v-1a7 7 0 007-7H9a8 8 0 01-8 8zm0 0a8 8 0 018 8h1a7 7 0 00-7-7v1zm8 8a8 8 0 01-8-8h-1a7 7 0 007 7v-1zm0 0v1a7 7 0 007-7h-1a8 8 0 01-8 8zm0 0h-1v-1a7 7 0 00-7-7H9a8 8 0 018 8zm0 0a8 8 0 01-8-8h1a7 7 0 007 7v-1z" />
    </svg>
  );
}


export default Spinner;
