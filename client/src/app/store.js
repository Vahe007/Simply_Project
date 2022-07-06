import userAccessReducer from "../features/userAccess/userAccessSlice";
import { configureStore } from "@reduxjs/toolkit";
import exhibitsReducer from "../features/exhibits/exhibitsSlice";
import filteringFeaturesReducer from "../features/filteringFeatures/filteringFeaturesSlice";

const store = configureStore({
  reducer: {
    userAccess: userAccessReducer,
    exhibits: exhibitsReducer,
    filteringFeatures: filteringFeaturesReducer
  }
})


export default store;
