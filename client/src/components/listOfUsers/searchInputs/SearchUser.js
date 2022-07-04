import { useUsersContext } from "../../features/users/UsersContextProvider";
import {  Input } from '@mui/material';
import { useDispatch } from "react-redux";
import { getUsersPerPage } from "../../features/users/usersSlice";


function SearchUser() {
    const { count, searchInputValue, page, sortBy, limit, setSearchInputValue } = useUsersContext();
    const dispatch = useDispatch();

    const onSearchInputChange = (evt) => {
        const {value} = evt.target;
        setSearchInputValue(value)
        dispatch(getUsersPerPage({page, sortBy, limit, contains: value}));
    }

    const inputAttributes = {
        placeholder: count < 3 ? `enter ${3 - count} more user${2 - count ? 's' : ''} to enable search` : "search",
        sx: {width: 300},
        onChange: onSearchInputChange,
        value: searchInputValue,
        disabled: count < 3
    }

   

    
    return  <Input {...inputAttributes} />
}

export default SearchUser;