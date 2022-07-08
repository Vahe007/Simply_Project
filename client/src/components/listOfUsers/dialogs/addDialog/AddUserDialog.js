import { editUserSchema } from "../../../../features/users/validations";
import MainDialog from "../helpers/MainDialog";
import { Formik, Form, useFormik  } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createAndGetUsers, selectUsers, setErrorToNull } from "../../../../features/users/usersSlice";
import Content from "./Content";
import { setSnackbar } from "../../../../features/snackbar/SnackbarSlice";
import { useEffect, useState } from "react";
import { getQueries } from "../updateDialog/helpers";

const AddUserDialog = ({setAddUserData, searchParams, setSearchParams}) => {
    const dispatch = useDispatch(); 
    const users = useSelector(selectUsers);
    const [isFirstTime, setIsFirstTime] = useState(true)

    const initialInputValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: ''
    }

    useEffect(() => {
        if (isFirstTime) {
            setIsFirstTime(false)
            return
        }
        console.log(users.error);
        if (!users.error.isError) {
            console.log(users.error)
            dispatch(setSnackbar({
                snackbarOpen: true,
                snackbarType: "success",
                snackbarMessage: "User successfully added"
            }))
            onClose();
        }
    }, [users.error])

    const onSubmit = (values) => {

        dispatch(createAndGetUsers({data: values, queries: getQueries(searchParams)}));        
    }

    const onClose = () => {
        setAddUserData(null)
    }

    // const formik = useFormik({
    //     initialValues: initialInputValues,
    //     validationSchema: editUserSchema,
    //     onSubmit: onSubmit
    // })

    return (
        <MainDialog
            title="Add User"
            content= {
                        <Formik
                            onSubmit={onSubmit}
                            initialValues={initialInputValues}
                            validationSchema={editUserSchema}
                        >
                            {
                                ({setFieldError}) => (
                                    <Form>
                                        <Content setFieldError={setFieldError}/>
                                    </Form> 
                                )
                            }
                           
                        </Formik>
                    }
            onClose={onClose}            
        />
    )
}


export default AddUserDialog;