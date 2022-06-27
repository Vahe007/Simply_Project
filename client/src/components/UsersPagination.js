import React from 'react';
import ListUsers from './listOfUsers/ListUsers.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsersPerPage } from '../features/users/usersSlice'
import { Pagination } from '@mui/material';
import UsersPerPageSelection from './listOfUsers/forms/UsersPerPageSelection';
import SortBySelection from './listOfUsers/forms/SortBySelection.js';
import { useUsersContext } from '../features/users/UsersContextProvider.js';
import { useAlertsContext } from './listOfUsers/alerts/AlertMessage.js';
import SearchUser from './listOfUsers/searchInputs/SearchUser.js';
import AddUser from './listOfUsers/AddUser.js';

export const UsersContext = React.createContext();


function UsersPagination() { 
  const dispatch = useDispatch();
  const {page, limit, count, sortBy, searchInputValue, setPage} = useUsersContext();
  const {showAlertMessage} = useAlertsContext(null);

  useEffect(() => {
    const queries = {
      page,
      limit: 10,
      contains: searchInputValue
    }

    dispatch(getUsersPerPage(queries));
  }, [])

  const onPageChange = e => {
    const { textContent } = e.target;
    const currentPage = +textContent; 

    setPage(currentPage);
    dispatch(getUsersPerPage({page: currentPage, sortBy, limit, contains: searchInputValue}));

  }

  const paginationAttributes = {
    count: Math.ceil(count / limit),
    onChange: onPageChange,
  }

  return (
    <>      
          { showAlertMessage }

          <SearchUser />

          <AddUser />

          <ListUsers />

          <Pagination {...paginationAttributes} />
          
          <SortBySelection />

          <UsersPerPageSelection />             
    </>
  );

} 

export default UsersPagination;



