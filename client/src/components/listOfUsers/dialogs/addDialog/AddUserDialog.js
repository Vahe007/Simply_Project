import MainDialog from "../helpers/MainDialog";
import { Formik, Form, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createAndGetUsers,
  selectUsers,
  setErrorToNull,
} from "../../../../redux/features/users/usersSlice";
import Content from "./Content";
import { setSnackbar } from "../../../../redux/features/snackbar/SnackbarSlice";
import { useEffect, useState } from "react";
import { getQueries } from "../updateDialog/helpers";
import { useCustomSearchParams } from "../../SearchParamsContext";
import { editUserSchema } from "../../validations";

const AddUserDialog = ({ setAddUserData }) => {
  const { error } = useSelector(selectUsers);
  const { searchParams, setSearchParams } = useCustomSearchParams();
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const initialInputValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
  };

  useEffect(() => {
    if (isFirstTime) {
      setIsFirstTime(false);
      return;
    }
    if (!users.error.isError) {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "User successfully added",
        })
      );
      onClose();
    }
  }, [users.error]);

  const onSubmit = (values) => {
    dispatch(
      createAndGetUsers({ data: values, queries: getQueries(searchParams) })
    );
  };

  const onClose = () => {
    setAddUserData(null);
  };

  return (
    <MainDialog
      title="Add User"
      content={
        <Formik
          onSubmit={onSubmit}
          initialValues={initialInputValues}
          validationSchema={editUserSchema}
        >
          {({ setFieldError }) => (
            <Form>
              <Content setFieldError={setFieldError} />
            </Form>
          )}
        </Formik>
      }
      onClose={onClose}
    />
  );
};

export default AddUserDialog;
