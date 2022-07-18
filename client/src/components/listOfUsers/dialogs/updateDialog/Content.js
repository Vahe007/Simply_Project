import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import React from "react";
import Select from "../../FormsUI/Select";
import TextField from "../../FormsUI/TextField";
import Button from "../../FormsUI/Button";
import { selectUsers } from "../../../../redux/features/users/usersSlice";
import { useSelector } from "react-redux";
import { classes } from "../../../../styles/usersListStyles";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Content({ helperText, setFieldError }) {
  const { error } = useSelector(selectUsers);
  useEffect(() => {
    console.log(error);
    if (error && error.message === "Email is already registered") {
      setFieldError("email", error.message);
    }
  }, [error]);

  return (
    <>
      {
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              name="firstName"
              label="First name"
              className={classes.textField}
            />
            <TextField
              name="lastName"
              label="Last name"
              className={classes.textField}
            />
            <TextField
              name="email"
              label="Email"
              className={classes.textField}
            />

            <TextField
              name="phoneNumber"
              label="Phone number"
              className={classes.textField}
            />
            <Select
              name="role"
              label="Role"
              options={["EMPLOYEE", "GUEST"]}
              className={classes.textField}
            />
            <Button className={classes.submitBtn}>Submit</Button>
            <p style={{ color: "red" }}>{helperText}</p>
          </Grid>
        </Grid>
      }
    </>
  );
}

export default Content;
