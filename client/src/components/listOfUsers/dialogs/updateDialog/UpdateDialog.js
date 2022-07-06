import { useState } from "react";
import React from "react";
import MainDialog from "../helpers/MainDialog";
import Content from "./Content";
import { useUsersContext } from "../../../../features/users/UsersContextProvider";
import { useDispatch } from "react-redux";
import { getUsersPerPage, updateAndGetUsers } from "../../../../features/users/usersSlice";
import { Form, Formik } from "formik";
import { editUserSchema } from "../../../../features/users/validations";
import { setSnackbar } from "../../../../features/snackbar/SnackbarSlice";

const UpdateDialog = ({user, editUserData, setEditUserData,  searchParams, setSearchParams}) => {
    let [helperText, setHelperText] = useState("");
    const dispatch = useDispatch();
    console.log(searchParams.get('page'));
    const initialInputValues = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role
    }

    const onSubmit = (data) => {
        const {id, ...newData} = data;

        const message = `User with ID: ${id} is EDITED`

        const sameInputsCount = ["firstName", "lastName", "email", "phoneNumber", "role"].reduce((acc, key) => {
            if(initialInputValues[key] === data[key]) {
                return acc + 1;
            } else {
                return acc;
            }
        }, 0)

        if(sameInputsCount === 5) {
            setHelperText("Submission Denied: At least one input should be editted");
        } else {
            dispatch(updateAndGetUsers({
                id: +id,
                newData,
                queries: {
                    page: searchParams.get('page'),
                    limit: searchParams.get('limit'),
                    sortBy: searchParams.get('sortBy'),
                    contains: searchParams.get('contains'),
                }
            }))
    
            onClose();
    
            dispatch(setSnackbar({
                snackbarOpen: true,
                snackbarMessage: message,
                snackbarType: "success"
            }))
        }

       
    }

    const onClose = () => {
        setEditUserData(null)
    }
    
    return (
        <>
            {editUserData && 
            <MainDialog 
                title="Edit User"
               
                content =  {<Formik
                                initialValues={initialInputValues}
                                validationSchema={editUserSchema}
                                onSubmit = {onSubmit}
                                
                            >
                                <Form>
                                    <Content user={user} helperText={helperText} />
                                </Form>     
                            </Formik> 
                            }
                        
                onClose={onClose}
            />}
        </>
    )

}

export default UpdateDialog;