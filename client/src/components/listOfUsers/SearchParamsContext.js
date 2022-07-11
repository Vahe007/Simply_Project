import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchParamsContext = createContext({});

function SearchParamsContextProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    limit: 10,
  });

  return (
    <SearchParamsContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </SearchParamsContext.Provider>
  );
}

export const useCustomSearchParams = () => useContext(SearchParamsContext);

export default SearchParamsContextProvider;
