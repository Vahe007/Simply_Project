import userAccessReducer from "../features/userAccess/userAccessSlice";
import { configureStore } from "@reduxjs/toolkit";
import exhibitsReducer from "../features/exhibits/exhibitsSlice";
import materialsReducer from "../features/materials/materialsSlice";

const store = configureStore({
  reducer: {
    userAccess: userAccessReducer,
    exhibits: exhibitsReducer,
    materials: materialsReducer
  }
})


export default store;
