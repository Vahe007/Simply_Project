import React, { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { getAllMaterials } from "../../features/filteringFeatures/selectors";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getMaterials } from "../../features/filteringFeatures/filteringFeaturesSlice";
import { getExhibitsPerPage } from "../../features/exhibits/exhibitsSlice";


const FilteringSelect = ({
  filteredCount,
  queries,
  name,
  variant = "standard",
  options = [],
  setSearchParams,
  searchParams,
  label = '',
  styles,
}) => {
  const handleChange = ({ target: { value } }) => {
      setSearchParams({ ...Object.fromEntries([...searchParams]), [label]: value, page: 1 });
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">{name}</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={searchParams.get(label) || ''}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => {
          return (
            <MenuItem key={uuid()} value={option[`${label}Name`]}>
              {option[`${label}Name`]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default FilteringSelect;
