import React, { useState } from 'react';
import UsersListBody from './listOfUsers/UsersListBody.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsersPerPage } from '../features/users/usersSlice'
import UsersListHeader from './listOfUsers/searchInputs/UsersListHeader.js';
import { classes } from '../styles/usersListStyles';
import { useSearchParams } from 'react-router-dom';
import { getQueries } from './listOfUsers/dialogs/updateDialog/helpers.js';
import UsersListFooter from './listOfUsers/UsersListFooter.js';

function UsersPagination() { 
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    const queries = {
      page: 1,
      limit: 10,
    }
    setInitial(false)
    setSearchParams(queries);
  }, [])

  useEffect(() => {
      if(!initial) {
        dispatch(getUsersPerPage(getQueries(searchParams)));
      }
  }, [searchParams])


  return (
    <>      
          <div className={classes.usersListContainer}>
              <UsersListHeader 
                searchParams={searchParams} 
                setSearchParams={setSearchParams}
              />

              <UsersListBody 
                searchParams={searchParams} 
                setSearchParams={setSearchParams}
              />

              <UsersListFooter 
                searchParams={searchParams} 
                setSearchParams={setSearchParams}
              />
                
          </div>
    </>
  );

} 

export default UsersPagination;



