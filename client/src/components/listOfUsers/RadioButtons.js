import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersPerPage, selectUsers } from '../../features/users/usersSlice';
import MainRadioButtons from './MainRadioButtons';

export default function RadioButtons({searchParams, setSearchParams}) {
    const dispatch = useDispatch();
    const handleChange = (e, value) => {
        alert('asfsafsafsa')
        // if(value === 'activeUsers') {
        //     alert('vvv')
        // }
        // switch (value) {
        //     case ("allUsers"): {
        //         dispatch(getUsersPerPage({
        //             page: searchParams.get('page'),
        //             limit: searchParams.get('limit'),
        //             contains: searchParams.get('contains'),
        //             sortBy: searchParams.get('sortBy'),
        //             isActive: ""
        //         }))
        //         break;
        //     }

        //     case ("activeUsers"): {      
        //         alert('hii')          
        //         setSearchParams({
        //             page: 7,
        //             limit: searchParams.get('limit'),
        //             contains: searchParams.get('contains'),
        //             sortBy: searchParams.get('sortBy'),
        //             isActive: true
        //         })
               
        //         // dispatch(getActiveUsers({
        //         //     page: searchParams.get('page'),
        //         //     limit: searchParams.get('limit'),
        //         //     contains: searchParams.get('contains'),
        //         //     sortBy: searchParams.get('sortBy'),
        //         // }))

        //         break;
        //     }
        //     case ("inactiveUsers"): {
        //         // dispatch(getActiveUsers({
        //         //     page: searchParams.get('page'),
        //         //     limit: searchParams.get('limit'),
        //         //     contains: searchParams.get('contains'),
        //         //     sortBy: searchParams.get('sortBy'),
        //         // }))
        //     }
        // }
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