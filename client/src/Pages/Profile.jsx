import React from 'react'
import EmployeeHome from './EmployeeHome';
import AdminHome from './AdminHome';

const Profile = ({id, role, setExhibit}) => {
    if (role === "EMPLOYEE") {
        return <EmployeeHome />
    }
    else if (role === "ADMIN") {
        return <AdminHome />
    }
    
}

export default Profile;
