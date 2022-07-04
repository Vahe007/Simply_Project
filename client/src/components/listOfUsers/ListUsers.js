import ListUser from './ListUser';
import ListTitles from './ListTitles';
import {v4 as uuid} from 'uuid';
import { useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import DeleteDialog from './dialogs/deleteDialog/DeleteDialog';
import UpdateDialog from './dialogs/updateDialog/UpdateDialog';
import { deleteUser, getUsersPerPage, updateUser } from '../features/users/usersSlice';
import { useUsersContext } from '../features/users/UsersContextProvider';
import AlertMessage, { useAlertsContext } from './alerts/AlertMessage';

const ListUsers = () => {
    const {usersPerPage, count, page, limit, sortBy, searchInputValue, editUserData, setEditUserData } = useUsersContext();
    const dispatch = useDispatch();
    const z = count ? 1 : 0
    const x = (page - 1) * limit + z;
    const y = count < page * limit ? count : page * limit
    const [deleteUserId, setDeleteUserId] = useState(null);
    const {showAlertMessage, setAlertMessage} = useAlertsContext();

    const onEditClick = (user) => {
        setEditUserData(user)
    }

    const onEditConfirm = (data) => {
        const {id, ...newData} = data;

        dispatch(updateUser({
            id: +id,
            newData,
        }))

        setAlertMessage(
            <>
             <AlertMessage severity="success" title="User Edited"  onClose={() => setAlertMessage(null)}/>
            </>
          )

          setTimeout(() => {
            setAlertMessage(null)
          }, 2000)


        setTimeout(() => {
            dispatch(getUsersPerPage({page, limit, sortBy, contains: searchInputValue}))
        })

        onEditClose()
    }

    const onEditClose = () => {
        setEditUserData(null)
    }

    const onDeleteClick = ({id, name, surname, email}) => {
        setDeleteUserId({id, name, surname, email})
    }   

    const onDeleteConfirm = ({id, name, surname, email}) => {
        dispatch(deleteUser(id));

        const message = `User with 
        id: ${id} 
        name: ${name} 
        surname: ${surname}
        email: ${email}
        is deleted`

        setAlertMessage(
            <>
             <AlertMessage 
                severity="success" 
                title= {message}
                onClose={() => setAlertMessage(null)}/>
            </>
          )

          setTimeout(() => {
            setAlertMessage(null)
          }, 2000)


        setTimeout(() => {
            dispatch(getUsersPerPage({page, sortBy, limit, contains: searchInputValue}))
        }, 0)

        onDeleteClose();
    }
    
    const onDeleteClose = () => {
        setDeleteUserId(null)
    }

    return (
        <>
            <ul className="users-list">
                <ListTitles />
                {
                    usersPerPage.map(user => {
                        return <li key={uuid()}>
                                    <ListUser user={user} onEditClick={onEditClick} onDeleteClick={onDeleteClick}/>
                               </li>
                    })
                }
                <span>showing {`[${x} - ${y}]`} of {count} users</span>
            </ul>

            {deleteUserId && 
              <DeleteDialog
                onClose={onDeleteClose}
                onConfirm={() => onDeleteConfirm(deleteUserId)}
                usersPerPage={usersPerPage}
              />}

                {editUserData && 
                  <UpdateDialog 
                    onClose={onEditClose}
                    onConfirm={onEditConfirm}
                    user = {editUserData}
                  />
                }
        </>
        
    )
}

export default ListUsers;
