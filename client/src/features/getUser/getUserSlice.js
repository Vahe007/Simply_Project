import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./getUserAPI";

export const loadUser = createAsyncThunk("user/loadUser", async (body) => {
  const data = await fetchUser(body);
  return data;
});

const initialState = {
  userInfo: {},
  error: "",
  token: "",
  isLoading: false,
};
const getUser = createSlice({
  name: "login",
  initialState,
  reducers: {},

  extraReducers: {
    [loadUser.pending]: (state, {payload}) => {
      state.isLoading = true;
    },
    [loadUser.fulfilled]: (state, { payload }) => {
      if (!payload.data.data) {
        const {message} = payload.data.error;
        state.error = message;
        localStorage.setItem("error", message);
      }
      else {
        const {token, ...userInfo} = payload.data.data;
        state.userInfo = userInfo;
        state.token = token;
        document.cookie = `token=${token}; expires=${new Date(new Date().getTime() + 1000*60*60*24).toUTCString()}`;
      }
      state.isLoading = false;
    },
    [loadUser.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

const loginReducer = getUser.reducer;
export default loginReducer;
