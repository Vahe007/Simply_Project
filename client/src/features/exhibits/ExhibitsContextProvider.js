import { useContext, createContext, useState } from "react";

const ExhibitsContext = createContext(null);

const ExhibitsContextProvider = ({ children }) => {
  const [exhibit, setExhibit] = useState(null);

  return (
    <ExhibitsContext.Provider value={{exhibit, setExhibit}}>
      {children}
    </ExhibitsContext.Provider>
  );
};

export const useExhibit = () => useContext(ExhibitsContext);

export default ExhibitsContextProvider;
