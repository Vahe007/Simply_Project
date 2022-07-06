import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { getExhibitsPerPage } from "../../features/exhibits/exhibitsSlice";

const MainSelectMUI = ({
  queries,
  name,
  variant = "standard",
  options = {},
  setSearchParams,
  searchParams,
  label,
  styles,
}) => {
    const dispatch = useDispatch();

  const handleChange = ({target: {value}}) => {
    // searchParams.delete(label);
    // value ? setSearchParams({...params, [label]: value}) : setSearchParams(searchParams);

    if (value === "") {
      searchParams.delete(label);
      setSearchParams(searchParams);
    }
    else  {
      setSearchParams({...Object.fromEntries([...searchParams]), [label]: value})
    }
  };
  return (
    <FormControl variant={variant} sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">{name}</InputLabel>
      <Select value={searchParams.get(label) || ''}  onChange={handleChange}>

        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {Object.keys(options).map((option) => {
          return (
            <MenuItem key={uuid()} value={option}>
              {options[option]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
export default MainSelectMUI;
