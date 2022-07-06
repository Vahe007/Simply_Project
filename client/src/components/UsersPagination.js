import React, { useState } from 'react';
import ListUsers from './listOfUsers/ListUsers.js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersPerPage, selectUsers } from '../features/users/usersSlice'
import { Pagination } from '@mui/material';
import UsersPerPageSelection from './listOfUsers/forms/UsersPerPageSelection';
import SortBySelection from './listOfUsers/forms/SortBySelection.js';
import SearchUser from './listOfUsers/searchInputs/SearchUser.js';
import { classes } from '../styles/usersListStyles';
import { useSearchParams } from 'react-router-dom';

function UsersPagination() { 
  const dispatch = useDispatch();
  const { countAfterSearch } = useSelector(selectUsers);
  const [searchParams, setSearchParams] = useSearchParams();
  const [initial, setInitial] = useState(true);
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const contains = searchParams.get('contains');
  const sortBy = searchParams.get('sortBy');

  useEffect(() => {
    const queries = {
      page: 1,
      limit: 10,
      contains: "",
      sortBy: ""
    }

    dispatch(getUsersPerPage(queries));

    setInitial(false)
  }, [])

  useEffect(() => {
      dispatch(getUsersPerPage({page, limit, contains, sortBy}));
  }, [searchParams])


  const onPageChange = (_, page) => {
    setSearchParams({
      page,
      limit: searchParams.get('limit'),
      contains: searchParams.get('contains'),
      sortBy: searchParams.get('sortBy')
    })
  }
      
  const paginationAttributes = {
    count: Math.ceil(countAfterSearch / limit),
    onChange: onPageChange,
  }

  return (
    <>      
          <div className={classes.usersListContainer}>
              <SearchUser 
                searchParams={searchParams} 
                setSearchParams={setSearchParams}
              />

              <ListUsers 
                searchParams={searchParams} 
                setSearchParams={setSearchParams}
              />

              <Pagination {...paginationAttributes} />

              <SortBySelection 
                searchParams={searchParams} 
                setSearchParams={setSearchParams}
              />

              <UsersPerPageSelection 
                searchParams={searchParams} 
                setSearchParams={setSearchParams}
              />            
          </div>
    </>
  );

} 

export default UsersPagination;



