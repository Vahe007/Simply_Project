<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from "react";
import { useAuth } from "../components/auth";
import Header from "../components/HeaderWrapper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import { getExhibitsPerPage } from "../features/exhibits/exhibitsSlice";
import ExhibitsList from "./Profile/exhibitsList";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader"
const Profile = () => {
  const auth = useAuth();
  const [a, setA] = useState("");

  const handleChange = ({target: {value}}) => {
    auth.logout();
  };


  if (auth.user) {
    return (
      <>
        <ProfileHeader />
        {/* <div>
          <Select
            value={a}
            label="A"
            onChange={handleChange}
          >
            <MenuItem value={true}>Logout</MenuItem>
          </Select>
          PROFILE
        </div> */}
        <ExhibitsList />
      </>
    );
  }
};
>>>>>>> develop

export default Profile;
