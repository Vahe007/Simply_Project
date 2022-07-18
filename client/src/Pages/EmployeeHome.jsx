import React, { useState, useEffect } from "react";
import { useAuth } from "../hoc/auth";
import Header from "../components/HeaderWrapper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import { getExhibitsPerPage } from "../redux/features/exhibits/exhibitsSlice";
import { updateRoute } from "../redux/features/userAccess/userAccessSlice";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useExhibit } from "../redux/features/exhibits/ExhibitsContextProvider";
import ExhibitsPagination from "../components/exhibit/exhibitsList/ExhibitsPagination";

const Employee = () => {
  const exhibit = useExhibit();
  const navigate = useNavigate();
  
  useEffect(() => {
    exhibit.setExhibit(null);
  }, [])

  return (
    <div style={{margin: '50px'}}>
      <Button onClick={() => navigate("/addexhibit")}>Add Exhibit</Button>
      <ExhibitsPagination />
    </div>
  );
};

export default Employee;
