import React from 'react'
import EmployeeHome from './EmployeeHome';
import UsersPagination from '../components/UsersPagination';
import GuestPage from "./GuestPage";

const Profile = ({id, role, setExhibit}) => {
    if (role === "EMPLOYEE") {
        return <EmployeeHome />
    }
    else if (role === "ADMIN") {
        return <UsersPagination  />
    }
    else if(role === "GUEST") {
        return <GuestPage />
    }
}

export default Profile;
