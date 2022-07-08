import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {v4 as uuid} from 'uuid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUsersPerPage } from '../../../features/users/usersSlice';
import { useUsersContext } from '../UsersContextProvider';
import { Select } from '@mui/material';

function UsersPerPageSelection({searchParams, setSearchParams}) {

    const onPageNumberChange = (e) => {
        searchParams.set('page', 1);
        searchParams.set('limit', e.target.value);
        setSearchParams(searchParams);
    }

    return (
        <>
             <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                 <InputLabel id="demo-simple-select-standard-label">users Per Page</InputLabel>
                 <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="UsersPerPage"
                    defaultValue="10"
                    onChange={onPageNumberChange}
                 >
                    
                 {[3,5,10].map(el => <MenuItem key={uuid()} value={el} > {el} </MenuItem>)}
                 </Select>
             </FormControl>
               
        </>            
    )
}

export default UsersPerPageSelection;