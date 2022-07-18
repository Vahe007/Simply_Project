import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    snackbarOpen: false,
    snackbarType: "success",
    snackbarMessage: ""
}

export const selectSnackbar = state => state.snackbar;

export const snackbarSlice = createSlice({
    name: "snackbar",
    initialState,
    reducers: {
        setSnackbar: (state, action) => {
            state.snackbarOpen = action.payload.snackbarOpen;
            state.snackbarType = action.payload.snackbarType;
            state.snackbarMessage = action.payload.snackbarMessage;
        }
    }
})

export const {setSnackbar} = snackbarSlice.actions;

export default snackbarSlice.reducer;