import TextField from "../../FormsUI/TextField/index.js";
import Select from "../../FormsUI/Select/index.js"
import Button from "../../FormsUI/Button/index.js";
import { Grid } from "@mui/material";
import { selectUsers } from "../../../../features/users/usersSlice.js";
import {useSelector} from 'react-redux';
import { useEffect } from "react";

function Content({setFieldError}) {
    const {error} = useSelector(selectUsers)

    useEffect(() => {
        if(error && error.message === 'Email is already registered') {
            setFieldError("email", error.message);
        }
        console.log(error);
    }, [error])

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <TextField
                        name="firstName"
                        label="first Name"   
                    />
                    <TextField 
                        name="lastName"
                        label="last Name"
                    />
                    <TextField 
                        name="email"
                        label="email"
                        
                    />
                    <TextField
                        name="password"
                        label="password"
                    />
                    <TextField 
                        name="phoneNumber"
                        label="phoneNumber"
                    />
                    <Select 
                        name="role"
                        label="Role"
                        options={["EMPLOYEE", "GUEST"]}
                    />
                    <Button>
                        Submit
                    </Button>
                </Grid>
            </Grid>     
        </>
    )
}

export default Content;