import { useEffect } from "react";
import { Grid } from "@mui/material";
import React from "react";
import Select from "../../FormsUI/Select";
import TextField from "../../FormsUI/TextField";
import Button from "../../FormsUI/Button";
import { selectUsers } from "../../../../features/users/usersSlice";
import { useSelector } from "react-redux";
import { classes } from "../../../../styles/usersListStyles";

function Content({ helperText, setFieldError }) {
  const { error } = useSelector(selectUsers);

  useEffect(() => {
    if (error && error.message === "Email is already registered") {
      setFieldError("email", error.message);
    }
    console.log(error);
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
              label="email"
              className={classes.textField}
            />
            <TextField
              name="phoneNumber"
              label="phoneNumber"
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
