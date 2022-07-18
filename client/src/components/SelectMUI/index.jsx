import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getExhibitsPerPage } from "../../redux/features/exhibits/exhibitsSlice";
import { useDispatch } from "react-redux";
import {useExhibits} from "../../redux/features/exhibits/ExhibitsContextProvider";
import { useQueryParams, NumberParam, StringParam, ArrayParam } from 'use-query-params';

const SelectWrapper = ({ pageNumber }) => {
  const [query, setQuery] = useQueryParams({
    sortBy: StringParam,
    limit: NumberParam,
    page: NumberParam
  });
  const {sortBy, limit, page} = query;

  const dispatch = useDispatch();
  // const {limit, setLimit, sortBy, setSortBy} = useExhibits();

  const handleChange = ({ target: { value: sortBy } }) => {
    setQuery({sortBy})
    dispatch(getExhibitsPerPage({sortBy, page: pageNumber}))
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={sortBy}
          onChange={handleChange}
          label="Sort By"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"ID"}>Id</MenuItem>
          <MenuItem value={"Name(A-Z)"}>Name(A-Z)</MenuItem>
          <MenuItem value={"Name(Z-A)"}>Name(Z-A)</MenuItem>
          <MenuItem value={"FundNumber(A-Z)"}>FundNumber(A-Z)</MenuItem>
          <MenuItem value={"FundNumber(Z-A)"}>FundNumber(Z-A)</MenuItem>
          <MenuItem value={"acquisitionPeriod(new to old)"}>acquisition Period-latest to oldest</MenuItem>
          <MenuItem value={"acquisitionPeriod(old to new)"}>acquisition Period-oldest to latest</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectWrapper;
