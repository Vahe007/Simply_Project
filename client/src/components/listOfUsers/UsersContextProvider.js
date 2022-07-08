import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

const UsersContext = createContext();

export const UsersContextProvider = ({children}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    <UsersContext.Provider value={{searchParams, setSearchParams}}>
        {children}
    </UsersContext.Provider>
}

export const useUsersContext = () => useContext(useUsersContext);