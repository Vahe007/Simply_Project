import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Input, FormHelperText, Select, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function MainDialog(props) {
    const {title, content, onConfirm, onClose, disabled, deleteId} = props;

    return (
        <>
            
             <Dialog
                open
                sx={{
                    paddingTop: '0px'
                }}
                onClose={onClose}
            >
               { !deleteId && 
                 <CloseIcon 
                    fontSize="large"
                    onClick={onClose}
                /> 
                }
                <DialogTitle
                >
                    {title}
                </DialogTitle>

                <DialogContent>
                    {content}
                </DialogContent>

                {deleteId && 
                    <DialogActions>
                        <Button onClick={onConfirm} disabled={disabled || false}>yes</Button>
                        <Button onClick={onClose} autoFocus>
                            cancel
                        </Button>
                    </DialogActions>
                } 
            </Dialog>
        
        </>
       
    )
}

export default MainDialog;