import React, { useContext, useEffect, useState } from "react";
import './users.css'
import ButtonMUI from "./ButtonMUI";
import {v4 as uuid} from 'uuid'
import { useDispatch } from 'react-redux/es/exports';
import { Switch } from "@mui/material";
import { changeActiveness, getUsersPerPage, updateUser } from "../../features/users/usersSlice";
import { useUsersContext } from "../../features/users/UsersContextProvider";
import { classes } from "./styles";
import AlertMessage, { useAlertsContext } from "./alerts/AlertMessage";

const ListUser = (props) => {
    const {user, onEditClick, onDeleteClick, onSwitchChange} = props;
    const {page, limit, sortBy, contains: searchInputValue} = useUsersContext();
    const dispatch = useDispatch();
    const {isActive} = user;
    const dontShowItems = ['id', 'password', 'isActive', 'lastLogin', 'exhibitsUpdated'];
    const createdAtFullDate = (new Date(user.createdAt)).toLocaleString();
    const updatedAtFullDate = (new Date(user.updatedAt)).toLocaleString();
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    console.log(user);

    

    return <>
                {Object.entries(user).map(el => {
                    if(dontShowItems.includes(el[0])) {
                        return false;
                    } else if (el[0] === 'exhibitsCreated'){
                        return <span className={classes.liSpan} key={uuid()}>{el[1].length}</span>
                    } else if(el[0] === 'createdAt') {
                        return <span className={classes.liSpan} key={uuid()}>{createdAtFullDate}</span>

                    } else if(el[0] === 'updatedAt') {
                        return <span className={classes.liSpan} key={uuid()}>{updatedAtFullDate}</span>

                    } else {
                        return <span className={classes.liSpan} key={uuid()}>{el[1]}</span>
                    }
                })}
                <ButtonMUI 
                    color="primary" 
                    variant="contained" 
                    text="Edit" 
                    onClick={() => onEditClick(user)}
                    className={classes.liSpan}
                />
                <Switch 
                {...label} 
                onChange={(evt) => {
                    onSwitchChange(evt, user)
                }}
                checked={isActive}
                />
                {/* <ButtonMUI 
                    color="error" 
                    variant="contained" 
                    text="Delete"
                    onClick={() => onDeleteClick(user)}
                    user = {user}
                    className={classes.liSpan}

                /> */}
           </>
}


export default ListUser;
