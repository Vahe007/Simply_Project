import AddUserDialog from './dialogs/addDialog/AddUserDialog';
import ButtonMUI from './ButtonMUI';
import { useUsersContext } from '../../features/users/UsersContextProvider';
import { classes } from '../../styles/usersListStyles';
import { useState } from 'react';

function AddUser() {
    const [addUserData, setAddUserData] = useState(null)

    const ButtonMUIAttributes = {
        color: "primary" ,
        variant: "contained" ,
        text: "Add User" ,
        onClick: () => onAddClick(1),
        className: classes.addUserButton
    }

    const onAddClick = (user) => {
        setAddUserData(user)
    }  

    return (
            <>
                <ButtonMUI {...ButtonMUIAttributes} />  
                    {
                    addUserData && 
                    <AddUserDialog 
                    setAddUserData={setAddUserData}
                    />
                    }    
            </>
            
    )
}

export default AddUser