import React, { useState, useEffect } from "react";
import { useAuth } from "../hoc/auth";
import Header from "../components/HeaderWrapper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import { getExhibitsPerPage } from "../features/exhibits/exhibitsSlice";
// import ExhibitsList from "../components/ExhibitsList";
import { updateRoute } from "../features/userAccess/userAccessSlice";
import { Button } from "@mui/material";
import {  useNavigate } from "react-router-dom";
import { useExhibit } from "../features/exhibits/ExhibitsContextProvider";
import ExhibitsPagination from "../components/exhibitsList/ExhibitsPagination";

const Employee = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [a, setA] = useState("");
  const exhibit = useExhibit();
  const handleChange = ({target: {value}}) => {
    auth.logout();
  };
  useEffect(() => {
    exhibit.setExhibit(null);
  }, [])

    return (
      <>
        {/* <Header /> */}
        <div>
          <Select
            value={a}
            label="A"
            onChange={handleChange}
          >
            <MenuItem value={true}>Logout</MenuItem>
          </Select>
          <Button onClick={() => {
            navigate('/addexhibit');
          }}>Add Exhibit</Button>
        </div>
        <ExhibitsPagination />
        {/* <ExhibitsList /> */}
      </>
    );
};

export default Employee;
