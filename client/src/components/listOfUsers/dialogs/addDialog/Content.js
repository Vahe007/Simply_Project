import TextField from "../../FormsUI/TextField/index.js";
import Select from "../../FormsUI/Select/index.js"
import Button from "../../FormsUI/Button/index.js";
import { Grid } from "@mui/material";

function Content() {
    return (
        <>
            <Grid container spacing={4}>
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
        </>
    )
}

export default Content;