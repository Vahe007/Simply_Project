import { useContext, createContext, useState } from "react";

const ExhibitsContext = createContext(null);

const ExhibitsContextProvider = ({ children }) => {
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [contains, setContains] = useState("");

  return (
    <ExhibitsContext.Provider
      value={{
        limit,
        setLimit,
        page,
        setPage,
        contains,
        setContains,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </ExhibitsContext.Provider>
  );
};

export const useExhibits = () => useContext(ExhibitsContext);

export default ExhibitsContextProvider;
