import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loginReducer from "../features/getUser/getUserSlice";
import signupReducer from "../features/createUser/createUserSlice";
import userAccessReducer from "../features/userAccess/userAccessSlice";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
  reducer: {
    // login: loginReducer,
    signup: signupReducer,
    userAccess: userAccessReducer,
  }
})


export default store;
