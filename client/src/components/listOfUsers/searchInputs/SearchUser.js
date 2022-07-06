import { useUsersContext } from "../../../features/users/UsersContextProvider";
import {  Input } from '@mui/material';
import { useDispatch } from "react-redux";
import { classes } from "../../../styles/usersListStyles";
import AddUser from "../AddUser";
import RadioButtons from "../RadioButtons";
import { getActiveUsers, getUsersPerPage } from "../../../features/users/usersSlice";
import MainRadioButtons from "../MainRadioButtons";

function SearchUser({searchParams, setSearchParams}) {
    const dispatch = useDispatch();
  const handleChange =(e, value) => {
        switch (value) {
            case ("allUsers"): {
                dispatch(getUsersPerPage({
                    page: searchParams.get('page'),
                    limit: searchParams.get('limit'),
                    contains: searchParams.get('contains'),
                    sortBy: searchParams.get('sortBy'),
                }))

                break;
            }

            case ("activeUsers"): {
                dispatch(getActiveUsers({
                    contains: searchParams.get('contains'),
                    sortBy: searchParams.get('sortBy'),
                }))

                break;
            }
            case ("inactiveUsers"): {
                dispatch(getActiveUsers({
                    page: searchParams.get('page'),
                    limit: searchParams.get('limit'),
                    contains: searchParams.get('contains'),
                    sortBy: searchParams.get('sortBy'),
                }))
            }
        }
    }
    const searchInputWrapper = () => {
        let timerId;

        return (evt) => {
            clearTimeout(timerId);

            const {value} = evt.target;

            timerId = setTimeout(() => {
                setSearchParams({
                    limit: searchParams.get('limit'),
                    contains: value,
                    sortBy: searchParams.get('sortBy')
                })
            }, 600)
        }
    }

    const onSearchInputChange = searchInputWrapper();

    const label = {
        placeholder: "search",
        sx: {width: 300},
        onChange: onSearchInputChange,
    }
    
    return  <div className={classes.searchContainer}>
                <Input {...label} />

                <AddUser />

                <MainRadioButtons 
                    labels={["All users", 'Active users', "Inactive Users"]}
                    values={["allUsers", "activeUsers", "inActiveUsers"]}
                    handleChange={handleChange}
                    defaultValue="allUsers"
                />
             </div>
}

export default SearchUser;