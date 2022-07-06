import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useMemo } from 'react';
import {v4 as uuid} from 'uuid';
import { useDispatch } from 'react-redux';
import { getUsersPerPage } from '../../../features/users/usersSlice';
import { useUsersContext } from '../../../features/users/UsersContextProvider';

function SortBySelection ({searchParams, setSearchParams}) {
    const {limit} = useUsersContext();
    const options =  useMemo(() =>  ['name [A-Z]', 'name [Z-A]', 'created date (new to old)', 'created date (old to new)', 'updated date (new to old)', 'updated date (old to new)'], []);

    const onChange = (e) => {
        const { value } = e.target;
        setSearchParams({
            page: searchParams.get('page'),
            limit: searchParams.get('limit'),
            contains: searchParams.get('contains'),
            sortBy: value
        })
    }

    return (
        <>
                <FormControl  variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Sort by</InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Sort By"
                    onChange={onChange}
                    defaultValue=""
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    { options.map(option => <MenuItem key={uuid()} value={option} > {option} </MenuItem>) }
                    </Select>
                </FormControl>             
        </>
    )
}

export default SortBySelection;