import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchUser } from "./createUserAPI.js";

export const createUser = createAsyncThunk("user/createUser", async (body) => {
  const data = await fetchUser(body);
  console.log(data);
  return data;
});

const initialState = {
    userInfo: {},
    message: "",
    token: "",
    isLoading: false,
}

const signupUser = createSlice({
    name: "signup",
    initialState,

    extraReducers: {
        [createUser.pending]: (state) => {
            state.isLoading = true;
        },
        [createUser.fulfilled]: (state, {payload}) => {
            console.log(payload);
            if (payload.status === 400) {
                state.message = "Input(s) are not valid"
            }
            else if (!payload.data.data) {
                state.message = payload.data.error.message;
            }
            else {
                state.message = "User Successfuly Created";
            }
            localStorage.setItem("message", state.message);
            state.isLoading = false;
        },
        [createUser.rejected]: (state, action) => {
            state.isLoading = false;
        },
    }
})

const signupReducer = signupUser.reducer;
export default signupReducer;
