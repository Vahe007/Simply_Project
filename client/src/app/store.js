import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loginReducer from "../features/getUser/getUserSlice";
import signupReducer from "../features/createUser/createUserSlice";
import userAccessReducer from "../features/userAccess/userAccessSlice";
import { configureStore } from "@reduxjs/toolkit";
import exhibitsReducer from "../features/exhibits/exhibitsSlice";


const store = configureStore({
  reducer: {
    // login: loginReducer,
    signup: signupReducer,
    userAccess: userAccessReducer,
    exhibits: exhibitsReducer
  }
})


export default store;
