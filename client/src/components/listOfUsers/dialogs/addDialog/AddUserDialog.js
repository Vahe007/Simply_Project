import { editUserSchema } from "../../../../features/users/validations";
import MainDialog from "../helpers/MainDialog";
import { Formik, Form  } from "formik";
import { useDispatch } from "react-redux";
import { createUser, getUsersPerPage } from "../../../../features/users/usersSlice";
import { useUsersContext } from "../../../../features/users/UsersContextProvider";
import AlertMessage, { useAlertsContext } from "../../alerts/AlertMessage";
import Content from "./Content";

const AddUserDialog = () => {
    const {page, limit, sortBy, contains: searchInputValue, setAddUserData} = useUsersContext();
    const dispatch = useDispatch(); 
    const { setAlertMessage } = useAlertsContext(null);

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
        
        onClose()
    
        setAlertMessage(
            <>
                <AlertMessage severity="success" title="User Added" onClose={() => setAlertMessage(null)}/>
            </>
          )
    
        setTimeout(() => {
          setAlertMessage(null)
        }, 2000)
    }

    const onClose = () => {
        setAddUserData(null)
    }

    return (
        <MainDialog
            title="Add User"
            content= {<Formik
                            initialValues={initialInputValues}
                            validationSchema={editUserSchema}
                            onSubmit={onSubmit}      
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