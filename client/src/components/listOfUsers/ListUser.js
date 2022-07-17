import React from "react";
import ButtonMUI from "./ButtonMUI";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux/es/exports";
import { Switch } from "@mui/material";
import { classes } from "../../styles/usersListStyles.js";
import { TableCell, TableRow } from "@material-ui/core";

const ListUser = (props) => {
  const { user, onEditClick, onSwitchChange } = props;
  const { isActive } = user;
  const dontShowItems = [
    "password",
    "isActive",
    "lastLogin",
    "exhibitsUpdated",
  ];
  const createdAtFullDate = new Date(user.createdAt).toDateString();
  const updatedAtFullDate = new Date(user.updatedAt).toDateString();
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <>
      <TableCell component="th" scope="row">
        {user.id}
      </TableCell>
      <TableCell align="right">{user.firstName}</TableCell>
      <TableCell align="right">{user.lastName}</TableCell>
      <TableCell align="right">{user.email}</TableCell>
      <TableCell align="right">{user.phoneNumber}</TableCell>
      <TableCell align="right">{user.role}</TableCell>
      <TableCell align="right">{user.createdAt}</TableCell>
      <TableCell align="right">{user.updatedAt}</TableCell>
      {Object.entries(user).map((el) => {
        if (dontShowItems.includes(el[0])) {
          return false;
        } else if (el[0] === "exhibitsCreated") {
          return <TableCell align="right">{el[1].length}</TableCell>;
        } else if (el[0] === "createdAt") {
          return <TableCell align="right">{createdAtFullDate}</TableCell>;
        } else if (el[0] === "updatedAt") {
          return <TableCell align="right">{updatedAtFullDate}</TableCell>;
        } else {
          return <TableCell align="right">{el[1]}</TableCell>;
        }
      })}
      <span className={classes.liSpan}>
        <ButtonMUI
          color="primary"
          variant="contained"
          text="Edit"
          onClick={() => onEditClick(user)}
          className={classes.liSpan}
        />
      </span>
      <span className={classes.liSpan}>
        <Switch
          {...label}
          onChange={(evt) => {
            onSwitchChange(evt, user);
          }}
          checked={isActive}
        />
      </span>
    </>
  );
};

export default ListUser;
