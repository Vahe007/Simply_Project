import { Button } from "@mui/material";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import App from "../components/UsersPagination";
import { useNavigate } from "react-router-dom";
import {v4 as uuid} from 'uuid';
import { useState } from "react";

function AdminHome() {
    const navigate = useNavigate();

    const options = [
        {
            name: "Users",
            path: "userslist",
        },

        {
            name: "Materials",
            path: "allmaterials",
        },

        {
            name: "Statuses",
            path: "allstatuses",
        }

    ]
    return (
        <>
            <div>
                {
                    options
                        .map(({name, path, variant}) => {
                            return <Button
                                        key={uuid()}
                                        variant={variant}
                                        onClick={() => {
                                            navigate(path)
                                        }}
                                    > 
                                        {name}

                                    </Button>
                        })
                }
          
            </div>
            
            <Outlet />

        </>
    )
}

export default AdminHome;