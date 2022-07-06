import {v4 as uuid} from 'uuid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import DeleteDialog from './dialogs/deleteDialog/DeleteDialog';
import UpdateDialog from './dialogs/updateDialog/UpdateDialog';
import { getUsersPerPage, selectUsers, updateAndGetUsers } from '../../features/users/usersSlice';
import { classes } from '../../styles/usersListStyles';
import { setSnackbar } from '../../features/snackbar/SnackbarSlice';
import { Paper, Switch } from '@material-ui/core';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonMUI from './ButtonMUI';
import MainTable from './MainTable';

const ListUsers = ({searchParams, setSearchParams}) => {
    const {usersPerPage, searchInputValue} = useSelector(selectUsers);
    const dispatch = useDispatch();
    const [editUserData, setEditUserData] = useState(null)
    const [deleteUserId, setDeleteUserId] = useState(null);
    const page = searchParams.get('page')
    const limit = searchParams.get('limit')
    const sortBy = searchParams.get('sortBy')
    const contains = searchParams.get('contains')

    const onEditClick = (user) => {
        setEditUserData(user)
    }

    const onEditClose = () => {
        setEditUserData(null)
    }

    const onSwitchChange = (evt, user) => {
      const {id, firstName, lastName, password, email, phoneNumber, role, isActive} = user;

      const newData =  {
        firstName,
        lastName,
        password,
        email,
        phoneNumber,
        role,
        isActive: evt.target.checked
        }

      dispatch(updateAndGetUsers({
        id: user.id,
        newData,
        queries: {
            page: searchParams.get('page'),
            limit: searchParams.get('limit'),
            contains: searchParams.get('contains'),
            sortBy: searchParams.get('sortBy'),
        }
        }))

        const message = `User with ID: ${id} is ${isActive ? "DEACTIVATED" : "ACTIVATED"}`
        dispatch(setSnackbar({
            snackbarOpen: true,
            snackbarMessage: message,
            snackbarType: "success"
        }))

        setTimeout(() => {
            setSearchParams({
                page: searchParams.get('page'),
                limit: searchParams.get('limit'),
                contains: searchParams.get('contains'),
                sortBy: searchParams.get('sortBy'),
            })
        }, 0)
    }
    
    const onDeleteClose = () => {
        setDeleteUserId(null)
    }

    const label = { inputProps: { 'aria-label': 'Switch demo' } };    
    const headRow = ["ID", "First Name", "last Name", "Email", "Phone Number", "Role", "Created At", "Updated At", "Exhibits Added", "Edit", "Activate/Deactivate"];

    const data = usersPerPage.map(user => {
        const userClone = {...user};
        const createdAtFullDate = (new Date(userClone.createdAt)).toDateString();
        const updatedAtFullDate = (new Date(userClone.updatedAt)).toDateString();        
        userClone.createdAt = createdAtFullDate;
        userClone.updatedAt = updatedAtFullDate;
        userClone.exhibitsCreated = userClone.exhibitsCreated.length;
        delete userClone.lastLogin;
        delete userClone.exhibitsUpdated;
        delete userClone.password;
        delete userClone.isActive;
        userClone.EditBtn =  <ButtonMUI 
                                color="primary" 
                                variant="contained" 
                                text="Edit" 
                                onClick={() => onEditClick(user)}
                            />
        userClone.switchBtn =  <Switch  
                                    {...label} 
                                    onChange={(evt) => {
                                        onSwitchChange(evt, user)
                                    }}
                                    checked={user.isActive}
                                />
         return userClone;
    })

    return (
        <>
            <MainTable 
                headRow={headRow}
                data={data}
            />

            {deleteUserId && 
              <DeleteDialog
                onClose={onDeleteClose}
                usersPerPage={usersPerPage}
              />}

                {editUserData && 
                  <UpdateDialog 
                    onClose={onEditClose}
                    editUserData={editUserData}
                    setEditUserData={setEditUserData}
                    user = {editUserData}
                    searchParams={searchParams} 
                    setSearchParams={setSearchParams}
                  />
                }
        </>
        
    )
}

export default ListUsers;



























//rubbish
{/* <ul className={classes.ul}>
<ListTitles />
{
    usersPerPage.map(user => {
        return <TableRow key={user.id}>
                    <ListUser 
                        user={user} 
                        onEditClick={onEditClick}
                        onDeleteClick={onDeleteClick}
                        onSwitchChange = {onSwitchChange}
                        searchParams={searchParams} 
                        setSearchParams={setSearchParams}    
                    />
               </TableRow>
    })
}
<span>total: {count} users</span>
</ul> */}
