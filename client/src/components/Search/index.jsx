import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Search = ({onChange}) => {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField onChange={onChange} id="standard-basic" label="Seach by Name" variant="standard" />
    </Box>
  );
};

export default Search;
