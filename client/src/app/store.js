import userAccessReducer from "../features/userAccess/userAccessSlice";
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../features/users/usersSlice.js'
import materialsReducer from '../features/materials/materialsSlice.js'
import exhibitsReducer from '../features/exhibits/exhibitsSlice'
import snackbarReducer from '../features/snackbar/SnackbarSlice'
import filteringFeaturesReducer from "../features/filteringFeatures/filteringFeaturesSlice";

const store = configureStore({
  reducer: {
    userAccess: userAccessReducer,
    users: usersReducer,
    materials: materialsReducer,
    exhibits: exhibitsReducer,
    snackbar: snackbarReducer,
    filteringFeatures: filteringFeaturesReducer
  }
})


export default store;


