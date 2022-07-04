import { useState } from "react";
import { Grid, InputLabel, MenuItem } from "@mui/material";
import React from "react";
import { FormControl } from "react-bootstrap";
import Select from "../../FormsUI/Select";
import MainDialog from "../helpers/MainDialog";
import TextField from "../../FormsUI/TextField";
import Button from "../../FormsUI/Button";

function Content({user}) {
    
    const initialInputValues = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        password: user.password,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role
    }

  const [inputValues, setInputValues] = useState(initialInputValues)
  

const [role, setRole] = useState("");

    return (
        <>
          {<Grid container spacing={4}>
                <Grid item xs={12}>
                    <TextField
                        name="name"
                        label="name"  
                    />
                    <TextField 
                        name="surname"
                        label="surname"
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
                        options={["employee", "guest"]}
                    />
                    <Button>
                        Submit
                    </Button>
            </Grid>
            </Grid>      
        }
        </>
    )
}

export default Content;

// Object.entries(inputValues).slice(1, -1).map(([inputName, inputValue], index) => {
//     if(inputName === 'role') {
//             return  <FormControl key={index} sx={{width: 140}}>
//                             <InputLabel id="demo-simple-select-label">Role</InputLabel>
//                                 <Select
//                                     labelId="demo-simple-select-label"
//                                     id="demo-simple-select"
//                                     value={inputValue}
//                                     label="Role"
//                                     onChange={onRoleChange}
//                                 >
//                                     <MenuItem value={"EMPLOYEE"}>EMPLOYEE</MenuItem>
//                                     <MenuItem value={"GUEST"}>GUEST</MenuItem>
//                                     </Select> 
//                     </FormControl>
//         }

//     return <TextField 
//                 key={index}
//                 className="textField" 
//                 value={inputValue} 
//                 id={inputName}
//                 name={inputName}
//                 onChange={onInputChange} 
//                 label={inputName} 
//                 variant="outlined"
//             />
// })