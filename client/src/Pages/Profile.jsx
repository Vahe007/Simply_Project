import React from 'react'
import EmployeeHome from './EmployeeHome';
import UsersPagination from '../components/UsersPagination';

const Profile = ({id, role, setExhibit}) => {
    if (role === "EMPLOYEE") {
        return <EmployeeHome />
    }
    else if (role === "GUEST") {
        return <UsersPagination  />
    }
}

export default Profile;
