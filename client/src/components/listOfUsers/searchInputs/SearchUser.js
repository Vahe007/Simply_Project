import { useUsersContext } from "../../../features/users/UsersContextProvider";
import {  Input } from '@mui/material';
import { useDispatch } from "react-redux";
import { getUsersPerPage } from "../../../features/users/usersSlice";
import { classes } from "../styles";


function SearchUser() {
    const { count, searchInputValue, page, sortBy, limit, setSearchInputValue } = useUsersContext();
    const dispatch = useDispatch();

    const wrapper = () => {
        let timerId;

        return (evt) => {
            const {value} = evt.target;
            clearTimeout(timerId);

            timerId = setTimeout(() => {
                dispatch(getUsersPerPage({page, sortBy, limit, contains: value}));
            }, 1000)
        }
    }

    const onSearchInputChange = wrapper()

    const inputAttributes = {
        placeholder: count < 3 ? `enter ${3 - count} more user${2 - count ? 's' : ''} to enable search` : "search",
        sx: {width: 300},
        onChange: onSearchInputChange,
        disabled: count < 3,
        className: classes.searchContainer
    }

   

    
    return  <Input {...inputAttributes} />
}

export default SearchUser;