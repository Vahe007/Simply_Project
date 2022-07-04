import React, { useContext, useEffect, useState } from "react";
import './users.css'
import ButtonMUI from "./ButtonMUI";
import {v4 as uuid} from 'uuid'
import { useDispatch } from 'react-redux/es/exports';

const ListUser = (props) => {
    const {user, onEditClick, onDeleteClick} = props;
    const dontShowItems = ['id', 'password', 'isLoggedIn', 'lastLogin'];
    const createdAtFullDate = (new Date(user.createdAt)).toLocaleString();
    const updatedAtFullDate = (new Date(user.updatedAt)).toLocaleString();
    

    return <>
                {Object.entries(user).map(el => {
                    if(dontShowItems.includes(el[0])) {
                        return false;
                    } else if (el[0] === 'exhibitsCreated'){
                        return <span key={uuid()}>{el[1].length}</span>
                    } else if(el[0] === 'createdAt') {
                        return <span key={uuid()}>{createdAtFullDate}</span>

                    } else if(el[0] === 'updatedAt') {
                        return <span key={uuid()}>{updatedAtFullDate}</span>

                    } else {
                        return <span key={uuid()}>{el[1]}</span>
                    }
                })}
                <ButtonMUI 
                    color="primary" 
                    variant="contained" 
                    text="Edit" 
                    onClick={() => onEditClick(user)}
                />
                <ButtonMUI 
                    color="error" 
                    variant="contained" 
                    text="Delete"
                    onClick={() => onDeleteClick(user)}
                    user = {user}
                />
           </>
}


export default ListUser;
