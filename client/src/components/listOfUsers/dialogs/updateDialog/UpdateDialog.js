import { useState } from "react";
import React from "react";
import MainDialog from "../helpers/MainDialog";
import Content from "./Content";
import { useUsersContext } from "../../../../features/users/UsersContextProvider";
import { useDispatch } from "react-redux";
import { getUsersPerPage, updateUser } from "../../../../features/users/usersSlice";
import AlertMessage, { useAlertsContext } from "../../alerts/AlertMessage";
import { Form, Formik } from "formik";
import { editUserSchema } from "../../../../features/users/validations";
const UpdateDialog = ({user}) => {
    const {page, limit, count, sortBy, searchInputValue, setPage, addUserData, setAddUserData, editUserData, setEditUserData} = useUsersContext();
    const {showAlertMessage, setAlertMessage} = useAlertsContext();

    const dispatch = useDispatch()
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
        console.log(data);
        const {id, ...newData} = data;

        dispatch(updateUser({
            id: +id,
            newData,
        }))

        setAlertMessage(
            <>
             <AlertMessage severity="success" title="User Edited"  onClose={() => setAlertMessage(null)}/>
            </>
          )

          setTimeout(() => {
            setAlertMessage(null)
          }, 2000)


        setTimeout(() => {
            dispatch(getUsersPerPage({page, limit, sortBy, contains: searchInputValue}))
        })

        onClose()
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
                                    <Content user={user} />
                                </Form>     
                            </Formik> 
                            }
                        
                onClose={onClose}
            />}
        </>
    )

}

export default UpdateDialog;