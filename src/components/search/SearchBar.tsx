import React, { ChangeEvent, useRef, useState } from "react";
import { useSearchContext } from "../../context/SearchContext";
import bounceFunction from "../../utils/functions";
import { AutoComplete } from "../../types/api";
import Search from "../../services/Search";

function SearchBar() {
  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const { context } = useSearchContext(inputRef);
  // const [autoCompleteData, setAutoCompleteData] = useState<AutoComplete[]>(
  //   [] as AutoComplete[]
  // );

  // async function handleChange(e: ChangeEvent<HTMLInputElement>) {
  //   const data = await Search.autocomplete(e.target.value);
  //   if (!data.data) {
  //     setAutoCompleteData([]);
  //     return;
  //   }
  //   setAutoCompleteData(data.data.suggestions);
  // }

  // const bouncedChange = bounceFunction(handleChange, 600);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        placeholder="Search something..."
        className="w-full max-w-xl h-14 px-6 transition-shadow bg-transparent border-2 border-neutral-300 rounded-full focus:outline-none focus:border-blue-200 focus:shadow-xl text-lg focus:rounded-l-2xl focus:rounded-r-2xl"
        name="q"
        defaultValue={context.query}
        type="search"
        // onChange={bouncedChange}
      />
      {/* TODO: Implement autocomplete */}
      {/* <SearchAutoComplete data={autoCompleteData} /> */}
    </div>
  );
}

export default SearchBar;
