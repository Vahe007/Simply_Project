import userAccessReducer from "../features/userAccess/userAccessSlice";
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice.js";
import materialsReducer from "../features/materials/materialsSlice.js";
import exhibitsReducer from "../features/exhibits/exhibitsSlice";
import snackbarReducer from "./features/snackbar/SnackbarSlice";
import filteringFeaturesReducer from "../features/filteringFeatures/filteringFeaturesSlice";
import statusReducer from "../features/status/statusSlice";
import imagesReducer from "../features/images/imagesSlice";
import contributorsReducer from "../features/contributors/contributorsSlice";

const store = configureStore({
  reducer: {
    userAccess: userAccessReducer,
    users: usersReducer,
    materials: materialsReducer,
    exhibits: exhibitsReducer,
    snackbar: snackbarReducer,
    filteringFeatures: filteringFeaturesReducer,
    status: statusReducer,
    image: imagesReducer,
    contributors: contributorsReducer,
  },
});

export default store;
