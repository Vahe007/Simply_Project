import './App.css';
import React from 'react';
import ListUsers from './components/ListUsers';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsersPerPage, getAllEmails } from './features/users/usersSlice.js';
import { Pagination } from '@mui/material';
import UsersPerPageSelection from './components/forms/UsersPerPageSelection';
import SortBySelection from './components/forms/SortBySelection.js';
import { useUsersContext } from './features/users/UsersContextProvider.js';
import  { useAlertsContext } from './components/alerts/AlertMessage';
import SearchUser from './components/searchInputs/SearchUser';
import AddUser from './components/AddUser';

export const UsersContext = React.createContext();


function App() { 
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
    dispatch(getAllEmails())
  }, [])

  const onPageChange = e => {
    const { textContent } = e.target;
    const currentPage = +textContent; 

    setPage(currentPage);
    dispatch(getUsersPerPage({page: currentPage, sortBy, limit, contains: searchInputValue}));

  }

  const paginationAttributes = {
    count: Math.ceil(count / limit),
    onChange: onPageChange
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

export default App;
