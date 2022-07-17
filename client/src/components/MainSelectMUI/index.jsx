import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { getExhibitsPerPage } from "../../redux/features/exhibits/exhibitsSlice";

const MainSelectMUI = ({
  queries,
  name,
  variant = "standard",
  options = {},
  setSearchParams,
  searchParams,
  label='',
  styles,
}) => {

  const handleChange = ({target: {value}}) => {
    value ? searchParams.set(label, value) : searchParams.delete(label);
    searchParams.set('page', 1);
    setSearchParams(searchParams);
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
