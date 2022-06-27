import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./userAccessAPI";
import Cookies from 'js-cookie';

export const loadUser = createAsyncThunk(
  "userAccess/loadUser",
  async (body) => {
    const data = await fetchUser(body, "login");
    return data;
  }
);

export const createUser = createAsyncThunk(
  "userAccess/createUser",
  async ({ body, type }) => {
    const data = await fetchUser(body, "registration");
    console.log(data, "data");
    return data;
  }
);

const initialState = {
  userInfo: {},
  message: "",
  token: "",
  isLoading: false,
};
const getUser = createSlice({
  name: "userAccess",
  initialState,
  reducers: {},

  extraReducers: {
    [loadUser.pending]: (state) => {
      state.isLoading = true;
    },
    [createUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loadUser.fulfilled]: (state, { payload }) => {
      if (payload.status === 400) {
        state.message =
          "Something went wrong, try again after refreshing the page";
      }
      const { token = "", ...userInfo } = payload.data || {};
      const { message = "" } = payload.error || {};
      state.message = message;
      state.userInfo = userInfo;
      state.token = token;
      if (token) {
        Cookies.set('token', `${token}`, { expires: 1})
      }
      localStorage.setItem("message", message);

      state.isLoading = false;
    },
    [createUser.fulfilled]: (state, { payload }) => {
      if (payload.status === 400) {
        state.message =
          "Something went wrong, try again after refreshing the page";
      } else if (payload.error?.code === "P2002") {
        state.message = "User with such email already exists";
      } else {
        state.message = "User successfully created";
      }
      localStorage.setItem("message", state.message);
      state.isLoading = false;
    },
    [loadUser.rejected]: (state) => {
      state.isLoading = false;
    },
    [createUser.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default getUser.reducer;
