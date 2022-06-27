import React, { useState } from "react";
import { useAuth } from "../components/auth";
import Header from "../components/Header";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Profile = () => {
  const auth = useAuth();
  const [a, setA] = useState("");
  const handleChange = ({target: {value}}) => {
    auth.logout();
  };

  if (auth.user) {
    return (
      <>
        <Header />
        <div>
          <Select
            value={a}
            label="A"
            onChange={handleChange}
          >
            <MenuItem value={true}>Logout</MenuItem>
          </Select>
          PROFILE
        </div>
      </>
    );
  }
};

export default Profile;
