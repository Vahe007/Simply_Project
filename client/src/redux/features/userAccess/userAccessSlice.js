import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./userAccessAPI";
import Cookies from "js-cookie";
import { BASE_URL } from "../../../constants";

export const getMeCall = createAsyncThunk(
  "getUserCall",
  async ({ id, token }) => {
    const response = await fetch(`${BASE_URL}users/token/${+id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  }
);

export const loadUser = createAsyncThunk(
  "userAccess/loadUser",
  async (body) => {
    return fetchUser(body, "login");
  }
);

export const createUser = createAsyncThunk(
  "userAccess/createUser",
  async (body) => {
    const data = await fetchUser(body, "registration");
    return data;
  }
);

const initialState = {
  userInfo: {},
  message: "",
  token: "",
  isLoading: false,
  currentRoute: "",
  isAuthorized: false,
};
const getUser = createSlice({
  name: "userAccess",
  initialState,
  reducers: {
    updateRoute: (state, { payload }) => {
      state.currentRoute = payload;
    },
  },

  extraReducers: {
    [getMeCall.pending]: (state) => {
      state.isLoading = true;
    },
    [getMeCall.fulfilled]: (state, { payload }) => {
      state.token = payload.data?.token;
      state.userInfo = payload.data;
      state.isLoading = false;
    },
    [getMeCall.rejected]: (state) => {
      state.isLoading = false;
    },

    [loadUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loadUser.fulfilled]: (state, { payload }) => {
      const { status, error, data } = payload;
      const { token = "", ...userInfo } = data || {};
      const { message = "" } = error || {};
      console.log(error);
      status === 400 &&
        (state.message =
          "Something went wrong, try again after refreshing the page");
      [state.message, state.userInfo, state.token] = [message, userInfo, token];

      state.token && Cookies.set("token", `${token}`, { expires: 1 });
      state.token && (state.isAuthorized = true);
      userInfo?.id && Cookies.set("id", `${userInfo.id}`, { expires: 1 });
      localStorage.setItem("message", message);

      state.isLoading = false;
    },
    [loadUser.rejected]: (state) => {
      state.isLoading = false;
    },

    [createUser.pending]: (state) => {
      state.isLoading = true;
    },
    [createUser.fulfilled]: (state, { payload }) => {
      if (payload.status === 400) {
        state.message =
          "Something went wrong, try again after refreshing the page";
      } else if (payload.error?.code === "P2002") {
        state.message = "User with such email already exists";
      } else {
        const { data } = payload;
        const { token = "", ...userInfo } = data;
        [state.userInfo, state.token] = [userInfo, token];
        Cookies.set("id", `${userInfo.id}`, { expires: 1 });
        Cookies.set("token", `${token}`, { expires: 1 });
      }
      localStorage.setItem("message", state.message);
      state.isLoading = false;
    },
    [createUser.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { updateRoute } = getUser.actions;

export default getUser.reducer;
