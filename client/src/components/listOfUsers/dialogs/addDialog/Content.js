import TextField from "../../FormsUI/TextField/index.js";
import Select from "../../FormsUI/Select/index.js";
import Button from "../../FormsUI/Button/index.js";
import { Grid } from "@mui/material";
import { selectUsers } from "../../../../redux/features/users/usersSlice.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { classes } from "../../../../styles/usersListStyles";

function Content({ setFieldError }) {
  const { error } = useSelector(selectUsers);

  useEffect(() => {
    if (error && error.message === "Email is already registered") {
      setFieldError("email", error.message);
    }
  }, [error]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            name="firstName"
            label="first Name"
            className={classes.textField}
          />
          <TextField
            name="lastName"
            label="last Name"
            className={classes.textField}
          />
          <TextField name="email" label="email" className={classes.textField} />
          <TextField
            name="password"
            label="password"
            className={classes.textField}
          />
          <TextField
            name="phoneNumber"
            label="phoneNumber"
            className={classes.textField}
          />
          <Select
            className={classes.textField}
            name="role"
            label="Role"
            options={["EMPLOYEE", "GUEST"]}
          />
          <Button className={classes.submitBtn}>Submit</Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Content;
