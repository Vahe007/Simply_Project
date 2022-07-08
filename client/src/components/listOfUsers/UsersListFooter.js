import SortBySelection from "./forms/SortBySelection";
import UsersPerPageSelection from "./forms/UsersPerPageSelection";
import { Pagination } from '@mui/material';
import {useSelector} from 'react-redux';
import { selectUsers } from "../../features/users/usersSlice";

function UsersListFooter({searchParams, setSearchParams}) {
    const { countAfterSearch } = useSelector(selectUsers);
    const limit = searchParams.get('limit');
    
    const onPageChange = (_, page) => {
        searchParams.set("page", page)
        setSearchParams(searchParams);
    }

    const paginationAttributes = {
        count: Math.ceil(countAfterSearch / (limit || 1)), // || 1 kani limit@ null gllargor
        onChange: onPageChange,
    }
    
      return (
        <>
            <Pagination {...paginationAttributes} />

            <SortBySelection
            searchParams={searchParams} 
            setSearchParams={setSearchParams}
            />

            <UsersPerPageSelection
            searchParams={searchParams} 
            setSearchParams={setSearchParams}
            />         
        </>
        
      )
}

export default UsersListFooter;