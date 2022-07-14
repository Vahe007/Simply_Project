import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useMemo } from 'react';
import {v4 as uuid} from 'uuid';
import { getQueries } from '../dialogs/updateDialog/helpers';
import { useCustomSearchParams } from '../SearchParamsContext';

function SortBySelection () {
    const { searchParams, setSearchParams } = useCustomSearchParams();
    const options =  useMemo(() =>  ['name [A-Z]', 'name [Z-A]', 'created date (new to old)', 'created date (old to new)', 'updated date (new to old)', 'updated date (old to new)'], []);

    const onChange = (e) => {
        const { value } = e.target;
        if(value) {
            searchParams.set('page', 1);
            searchParams.set('sortBy', value);
            setSearchParams(searchParams)
        } else {
            setSearchParams(getQueries(searchParams, ['sortBy']))
        }
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