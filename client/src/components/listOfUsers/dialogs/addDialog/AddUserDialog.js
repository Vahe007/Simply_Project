import { editUserSchema } from "../../../../features/users/validations";
import MainDialog from "../helpers/MainDialog";
import { Formik, Form, useFormik  } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getUsersPerPage, selectUsers } from "../../../../features/users/usersSlice";
import { useUsersContext } from "../../../../features/users/UsersContextProvider";
import Content from "./Content";
import { setSnackbar } from "../../../../features/snackbar/SnackbarSlice";

const AddUserDialog = ({setAddUserData}) => {
    const {page, limit, sortBy, contains: searchInputValue} = useUsersContext();
    const dispatch = useDispatch(); 
    const {error } = useSelector(selectUsers);

    const initialInputValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: ''
    }

    const onSubmit = (values) => {
        dispatch(createUser(values));
        
        setTimeout(() => {
            dispatch(getUsersPerPage({page, limit, sortBy, contains: searchInputValue || ""}))
        }, 0)

        if(!error) {
            dispatch(setSnackbar({
                snackbarOpen: true,
                snackbarType: "success",
                snackbarMessage: "User successfully added"
            }))
        }
       
        
        onClose()
    
    }

    const onClose = () => {
        setAddUserData(null)
    }

    const formik = useFormik({
        initialValues: initialInputValues,
        validationSchema: editUserSchema,
        onSubmit: onSubmit
    })

    return (
        <MainDialog
            title="Add User"
            content= {<Formik
                            onSubmit={onSubmit}
                            initialValues={initialInputValues}
                            validationSchema={editUserSchema}
                        >
                            <Form>
                                <Content />
                            </Form>     
                        </Formik>}
            onClose={onClose}            
        />
    )
}


export default AddUserDialog;