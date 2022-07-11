import { useEffect, useState } from "react";
import React from "react";
import MainDialog from "../helpers/MainDialog";
import Content from "./Content";
import { useUsersContext } from "../../UsersContextProvider";
import { useDispatch } from "react-redux";
import {
  getUsersPerPage,
  selectUsers,
  updateAndGetUsers,
} from "../../../../features/users/usersSlice";
import { Form, Formik } from "formik";
import { editUserSchema } from "../../../../features/users/validations";
import { setSnackbar } from "../../../../features/snackbar/SnackbarSlice";
import { useSelector } from "react-redux";
import { getQueries } from "./helpers";
import { useCustomSearchParams } from "../../SearchParamsContext";

const UpdateDialog = ({ user, editUserData, setEditUserData }) => {
  const { searchParams, setSearchParams } = useCustomSearchParams();
  let [helperText, setHelperText] = useState("");
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    if (isFirstTime) {
      setIsFirstTime(false);
      return;
    }
    console.log(users.error);
    if (!users.error.isError) {
      console.log(users.error);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "User successfully Eddited",
        })
      );
      onClose();
    }
  }, [users.error]);

  const initialInputValues = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
  };

  const onSubmit = (data) => {
    const { id, ...newData } = data;

    const message = `User with ID: ${id} is EDITED`;

    const sameInputsCount = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "role",
    ].reduce((acc, key) => {
      if (initialInputValues[key] === data[key]) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    if (sameInputsCount === 5) {
      setHelperText("Submission Denied: At least one input should be editted");
    } else {
      dispatch(
        updateAndGetUsers({
          id: +id,
          newData,
          queries: getQueries(searchParams),
        })
      );
    }
  };

  const onClose = () => {
    setEditUserData(null);
  };

  return (
    <>
      {editUserData && (
        <MainDialog
          title="Edit User"
          content={
            <Formik
              initialValues={initialInputValues}
              validationSchema={editUserSchema}
              onSubmit={onSubmit}
            >
              {({ setFieldError }) => (
                <Form>
                  <Content
                    helperText={helperText}
                    setFieldError={setFieldError}
                  />
                </Form>
              )}
            </Formik>
          }
          onClose={onClose}
        />
      )}
    </>
  );
};

export default UpdateDialog;
