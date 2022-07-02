import React, { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { getAllMaterials } from "../../features/materials/selectors";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import MaterialItem from "./MaterialItem";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getMaterials } from "../../features/materials/materialsSlice";
import { getExhibitsPerPage } from "../../features/exhibits/exhibitsSlice";

const MaterialsList = ({
  params,
  name,
  variant = "standard",
  options = {},
  setSearchParams,
  searchParams,
  label,
  styles,
}) => {
  const materials = useSelector(getAllMaterials);
  const dispatch = useDispatch();
  const [age, setAge] = useState("");

  const handleChange = ({ target: { value } }) => {



    setAge(value);
    console.log(value);
    setSearchParams({ ...params, material: value });
    dispatch(getExhibitsPerPage({ ...params, material: value }));
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">Material</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {materials.map(({ materialName }) => {
          return (
            <MenuItem key={uuid()} value={materialName}>
              {`${materialName.slice(0, 1).toUpperCase()}${materialName.slice(
                1
              )}`}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default MaterialsList;
