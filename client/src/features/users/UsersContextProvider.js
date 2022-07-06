import { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { selectUsers } from "./usersSlice";
import { Route } from "react-router-dom"

const UsersContext = createContext({});

function UsersContextProvider({children}) {
    const {usersPerPage, count, countAfterSearch} = useSelector(selectUsers);

    return (
        <UsersContext.Provider value={{usersPerPage, countAfterSearch, count}} >
                        {children}
        </UsersContext.Provider>
    )
}

export default UsersContextProvider;

export const useUsersContext = () => useContext(UsersContext);
