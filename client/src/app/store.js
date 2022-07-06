import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loginReducer from "../features/getUser/getUserSlice";
import signupReducer from "../features/createUser/createUserSlice";
import userAccessReducer from "../features/userAccess/userAccessSlice";
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../features/users/usersSlice.js'
import materialsReducer from '../features/materials/materialsSlice.js'
import exhibitsReducer from '../features/exhibits/exhibitsSlice'
import snackbarReducer from '../features/snackbar/SnackbarSlice'

const store = configureStore({
  reducer: {
    // login: loginReducer,
    signup: signupReducer,
    userAccess: userAccessReducer,
    users: usersReducer,
    materials: materialsReducer,
    exhibits: exhibitsReducer,
    snackbar: snackbarReducer
    
  }
})


export default store;


