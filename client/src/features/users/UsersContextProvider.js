import { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { selectUsers } from "./usersSlice";

const UsersContext = createContext({});


function UsersContextProvider({children}) {
    const {usersPerPage, count} = useSelector(selectUsers);
    const [page, setPage] = useState(1);
    const [searchInputValue, setSearchInputValue] = useState("");
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState("");
    const [addUserData, setAddUserData] = useState(null)
    const [editUserData, setEditUserData] = useState(null)


    return (
        <UsersContext.Provider value={{page, setLimit, usersPerPage, limit, count, sortBy, setSortBy, searchInputValue, setPage, setSearchInputValue, addUserData, setAddUserData, editUserData, setEditUserData}} >
            {children}
        </UsersContext.Provider>
    )
}

export default UsersContextProvider;

export const useUsersContext = () => useContext(UsersContext);