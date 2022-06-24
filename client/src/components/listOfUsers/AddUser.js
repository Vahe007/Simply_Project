import AddUserDialog from './dialogs/addDialog/AddUserDialog';
import ButtonMUI from './ButtonMUI';
import { useUsersContext } from '../features/users/UsersContextProvider';

function AddUser() {
    const {page, limit, count, sortBy, searchInputValue, setPage, addUserData, setAddUserData} = useUsersContext();

    const ButtonMUIAttributes = {
        color: "primary" ,
        variant: "contained" ,
        text: "Add User" ,
        onClick: () => onAddClick(1)
    }

    const onAddClick = (user) => {
        setAddUserData(user)
    }  

    return (
        <div>
            <ButtonMUI {...ButtonMUIAttributes} />  
                {
                addUserData && 
                <AddUserDialog />
                }    
        </div>
    )
}

export default AddUser