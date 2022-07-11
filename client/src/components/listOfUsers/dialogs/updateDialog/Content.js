import { useState } from "react";
import { Grid, InputLabel, MenuItem } from "@mui/material";
import React from "react";
import Select from "../../FormsUI/Select";
import MainDialog from "../helpers/MainDialog";
import TextField from "../../FormsUI/TextField";
import Button from "../../FormsUI/Button";

function Content({user, helperText}) {
    const disabled = () => {

    }

    return (
        <>
          {<Grid container spacing={4}>
                <Grid item xs={12}>
                    <TextField
                        name="firstName"
                        label="First name"  
                    />
                    <TextField 
                        name="lastName"
                        label="Last name"
                    />
                    <TextField 
                        name="email"
                        label="email"
                        
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
                    <p style={{color: 'red'}}>{helperText}</p>
            </Grid>
            </Grid>      
        }
        </>
    )
}

export default Content;
