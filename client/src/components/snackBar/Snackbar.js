import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectSnackbar, setSnackbar } from "../../redux/features/snackbar/SnackbarSlice";

const CustomizedSnackbar = () => {
  const dispatch = useDispatch();
  const {snackbarOpen, snackbarType, snackbarMessage} = useSelector(selectSnackbar)

  const handleClose = (_, reason) => {
    if(reason === 'clickaway') {
      return;
    }

    dispatch(setSnackbar({
      snackbarOpen: false,
      snackbarType,
      snackbarMessage
    }))
  }

  return (
    <div>
      <Snackbar
      anchorOrigin={{vertical: 'bottom', horizontal: "right"}}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          color={snackbarType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )

}

export default CustomizedSnackbar;