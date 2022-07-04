import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {v4 as uuid} from 'uuid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUsersPerPage } from '../../features/users/usersSlice';
import { useUsersContext } from '../../features/users/UsersContextProvider';
import { Select } from '@mui/material';

function UsersPerPageSelection() {
    const dispatch = useDispatch();
    const {page, sortBy, setLimit, count, searchInputValue} = useUsersContext()
    const [selectedValue, setSelectedValue] = useState("");
    return (
        <>
             <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                 <InputLabel id="demo-simple-select-standard-label">users Per Page</InputLabel>
                 <Select
                 labelId="demo-simple-select-standard-label"
                 id="demo-simple-select-standard"
                 label="Sort By"
                 value={selectedValue} 
                 onChange={e => {
                     setSelectedValue(e.target.value);
                     setLimit(+e.target.value)
                     dispatch(getUsersPerPage({page, sortBy, limit: +e.target.value, contains: searchInputValue}))
                 }}
                 >
                 {[3,5,10].map(el => <MenuItem key={uuid()} value={el} disabled={el >= count }> {el} </MenuItem>)}
                 </Select>
             </FormControl>
               
        </>

                
      
    )
}

export default UsersPerPageSelection;