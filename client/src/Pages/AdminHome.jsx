import { Button } from "@mui/material";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import App from "../components/UsersPagination";
import { useNavigate } from "react-router-dom";
import {v4 as uuid} from 'uuid';
import { classes } from "../styles/adminHomePageStyle.js";
import { useEffect } from "react";

function AdminHome() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate("users")
    }, [])

    const options = [
        {
            name: "Users",
            path: "users",
            id: 1,
        },

        {
            name: "Materials",
            path: "allmaterials",
            id: 2
        },

    ]
    return (
        <>

        <>
                 <div className={classes.header}>
                    {
                        options
                            .map(({name, path, id, variant}) => {
                                const label = {
                                    className: classes.buttonHeader,
                                    key: id,
                                    variant,
                                    onClick: () => {
                                        navigate(path)
                                    }
                                }
                                return <Button{...label}> {name} </Button>
                            })
                    }
                </div>
                <Button 
                    onClick={() => {
                        navigate("addExhibit");
                    }}
                    variant="contained"
                >Add exhibit</Button>
        </>
                
               
            
                <Outlet />

          

        </>
    )
}

export default AdminHome;