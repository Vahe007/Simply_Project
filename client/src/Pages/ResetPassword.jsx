import { Box, Grid, Typography } from '@material-ui/core'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../components/FormsUI/Button'
import TextField from '../components/FormsUI/TextField'
import { BASE_URL } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { resetUserPassword, verifyUser } from '../features/userAccess/userAccessSlice'
import Paper from "@mui/material/Paper";
import { setSnackbar } from "../features/snackbar/SnackbarSlice";
import { resetingPasswordSchema } from "../features/userAccess/validations";
import { InputProps } from '../helpers/common'
import { getMessage } from "../features/userAccess/selectors"

const ResetPassword = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const message = useSelector(getMessage);
    const [errorMessage, setErrorMessage] = useState(message);

    const params = location.pathname.split("/");
    const id = params[2];
    const token = params[3];


    useEffect(() => {
        dispatch(verifyUser({ id, token }))
    }, [])

    useEffect(() => {
        setErrorMessage(message);
        if (errorMessage) {
            dispatch(
                setSnackbar({
                    snackbarOpen: true,
                    snackbarMessage: message,
                    snackbarType: "error",
                })
            );
        }
    }, [message])

    const onSubmit = (values) => {
        dispatch(resetUserPassword({ id, values }));
    }

    const formik = useFormik({
        initialValues: {
            newPass: ""
        },
        validationSchema: resetingPasswordSchema,
        onSubmit,
    })
    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box component="form" onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                        <Typography style={{ textAlign: "center", margin: "20px" }} component="h2" variant="h5">
                            Reseting Password
                        </Typography>
                        <TextField sx={{ m: "20px" }} fullwidth="false" name="newPass" formik={formik} label="New Password" />
                        <Button sx={{ m: "20px" }} type="submit">Reset Password</Button>
                    </Box>
                </Box>
            </Grid>
        </div>
    )
}

export default ResetPassword



// type={isVisible ? "text" : "password"} InputProps={InputProps(isVisible, changeVisibility)}
// type={isVisible ? "text" : "password"} InputProps={InputProps(isVisible, changeVisibility)}