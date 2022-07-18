import { useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import DeleteDialog from "./dialogs/deleteDialog/DeleteDialog";
import UpdateDialog from "./dialogs/updateDialog/UpdateDialog";
import {
  selectUsers,
  updateAndGetUsers,
} from "../../redux/features/users/usersSlice";
import { setSnackbar } from "../../redux/features/snackbar/SnackbarSlice";
import { Switch } from "@material-ui/core";
import ButtonMUI from "./ButtonMUI";
import MainTable from "./MainTable";
import { getQueries } from "./dialogs/updateDialog/helpers";
import { useCustomSearchParams } from "./SearchParamsContext";

const ListUsers = () => {
  const { searchParams, setSearchParams } = useCustomSearchParams();

  const { usersPerPage } = useSelector(selectUsers);
  const dispatch = useDispatch();
  const [editUserData, setEditUserData] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const onEditClick = (e, user) => {
    setEditUserData(user);
  };

  const onEditClose = (_, reason) => {
    setEditUserData(null);
  };

  const onSwitchChange = (evt, user) => {
    const {
      id,
      firstName,
      lastName,
      password,
      email,
      phoneNumber,
      role,
      isActive,
    } = user;
    const newData = {
      firstName,
      lastName,
      password,
      email,
      phoneNumber,
      role,
      isActive: evt.target.checked,
    };

    dispatch(
      updateAndGetUsers({
        id: user.id,
        newData,
        queries: getQueries(searchParams),
      })
    );

    const message = `User with ID: ${id} is ${
      isActive ? "DEACTIVATED" : "ACTIVATED"
    }`;
    dispatch(
      setSnackbar({
        snackbarOpen: true,
        snackbarMessage: message,
        snackbarType: "success",
      })
    );
  };

  const onDeleteClose = () => {
    setDeleteUserId(null);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };
  const headRow = [
    "ID",
    "First Name",
    "last Name",
    "Email",
    "Phone Number",
    "Role",
    "Created At",
    "Updated At",
    "Exhibits Added",
    "Edit",
    "Activate/Deactivate",
  ];

  const data = usersPerPage
    .filter((user) => user.role !== "ADMIN")
    .map((user) => {
      const userClone = { ...user };

      const createdAtFullDate = new Date(userClone.createdAt).toDateString();
      const updatedAtFullDate = new Date(userClone.updatedAt).toDateString();
      userClone.createdAt = createdAtFullDate;
      userClone.updatedAt = updatedAtFullDate;
      userClone.exhibitsCreated = userClone.exhibitsCreated.length;
      delete userClone.lastLogin;
      delete userClone.exhibitsUpdated;
      delete userClone.password;
      delete userClone.isActive;
      delete userClone.key;
      userClone.EditBtn = (
        <ButtonMUI
          color="primary"
          variant="contained"
          text="Edit"
          onClick={(e) => onEditClick(e, user)}
        />
      );
      userClone.switchBtn = (
        <Switch
          {...label}
          onChange={(evt) => {
            onSwitchChange(evt, user);
          }}
          checked={user.isActive}
        />
      );
      return userClone;
    });

  return (
    <>
      <MainTable headRow={headRow} data={data} />

      {deleteUserId && (
        <DeleteDialog onClose={onDeleteClose} usersPerPage={usersPerPage} />
      )}

      {editUserData && (
        <UpdateDialog
          onClose={onEditClose}
          editUserData={editUserData}
          setEditUserData={setEditUserData}
          user={editUserData}
        />
      )}
    </>
  );
};

export default ListUsers;
