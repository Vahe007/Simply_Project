import TextField from "../../FormsUI/TextField/index.js";
import Select from "../../FormsUI/Select/index.js";
import Button from "../../FormsUI/Button/index.js";
import { Grid } from "@mui/material";
import { selectUsers } from "../../../../redux/features/users/usersSlice.js";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { classes } from "../../../../styles/usersListStyles";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Content({ setFieldError }) {
  const { error } = useSelector(selectUsers);
  const [isVisible, setVisibility] = useState(false);
  const changeVisibility = () => {
    setVisibility(!isVisible);
  };
  useEffect(() => {
    if (error && error.message === "Email is already registered") {
      setFieldError("email", error.message);
    }
  }, [error]);

  const setInputProps = (isVisible, changeVisibility) => {
    return {
      endAdornment: isVisible ? (
        <VisibilityIcon onClick={changeVisibility} sx={{ cursor: "pointer" }} />
      ) : (
        <VisibilityOffIcon
          onClick={changeVisibility}
          sx={{ cursor: "pointer" }}
        />
      ),
    };
  };
  return (
    <>
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
          <TextField name="email" label="Email" className={classes.textField} />
          <TextField
            name="password"
            label="Password"
            className={classes.textField}
            InputProps={setInputProps(isVisible, changeVisibility)}
            type={isVisible ? "text" : "password"}
          />
          <TextField
            name="phoneNumber"
            label="Phone number"
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
