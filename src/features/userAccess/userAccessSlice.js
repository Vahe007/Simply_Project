import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./userAccessAPI";

export const loadUser = createAsyncThunk("userAccess/loadUser", async ({body, type}) => {
  console.log(body);
  const data = await fetchUser(body, type);
  return data;
});

export const createUser = createAsyncThunk("userAccess/createUser", async (body) => {
  const data = await fetchUser(body, "registration");
  return data;
});

const initialState = {
  userInfo: {},
  error: "",
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
      if (!payload.data.data) {
        const { message } = payload.data.error;
        state.error = message;
        localStorage.setItem("error", message);
      } else {
        const { token, ...userInfo } = payload.data.data;
        state.userInfo = userInfo;
        state.token = token;
        document.cookie = `token=${token}; expires=${new Date(
          new Date().getTime() + 1000 * 60 * 60 * 24
        ).toUTCString()}`;
      }
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