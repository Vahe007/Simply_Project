import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveUsers, getUsersPerPage, selectUsers } from '../../features/users/usersSlice';
import MainRadioButtons from './MainRadioButtons';

export default function RadioButtons({searchParams, setSearchParams}) {
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
                    page: searchParams.get('page'),
                    limit: searchParams.get('limit'),
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
  return (
    <MainRadioButtons 
        labels={["All Users", "Active Users", "Inactive Users"]}
      handleChange={handleChange}
      values={["allUsers", "activeUsers", "inactiveUsers"]}
      defaultValue="allUsers"
    />
    
  );
}