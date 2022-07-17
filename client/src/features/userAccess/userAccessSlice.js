import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./userAccessAPI";
import Cookies from 'js-cookie';
import { BASE_URL } from "../../constants";

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
)

export const sendLink = createAsyncThunk(
  "getKey",
  async (data) => {
    const response = await fetch(`${BASE_URL}users/sendKey`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      method: "POST"
    });
    return response.json();

  }
)

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

export const verifyUser = createAsyncThunk(
  "userAccess/verifyUser",
  async ({ id, token }) => {
    const response = await fetch(`${BASE_URL}users/verify/${id}/${token}`);
    return response.json();
  }
)

export const resetUserPassword = createAsyncThunk(
  "userAccess/resetPassword",
  async ({ id, values }) => {
    const response = await fetch(`${BASE_URL}users/reset/${id}`,
    {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    })
    return response.json();
  }
)


const initialState = {
  userInfo: {},
  message: "",
  token: "",
  isLoading: false,
  currentRoute: "",
  isAuthorized: false,
  verificationKey: ""
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


      status === 400 && (state.message = "Something went wrong, try again after refreshing the page");
      [state.message, state.userInfo, state.token] = [message, userInfo, token];

      state.token && Cookies.set('token', `${token}`, { expires: 1 })
      state.token && (state.isAuthorized = true);
      userInfo?.id && Cookies.set('id', `${userInfo.id}`, { expires: 1 })
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
        Cookies.set('id', `${userInfo.id}`, { expires: 1 })
        Cookies.set('token', `${token}`, { expires: 1 })
      }
      state.isLoading = false;
    },
    [createUser.rejected]: (state) => {
      state.isLoading = false;
    },



    [sendLink.fulfilled]: (state, { payload }) => {
      const {message = ""} = payload.error || {};
      state.message = message;
    },


    [verifyUser.fulfilled]: (state, { payload }) => {
      const {message = ""} = payload.error || {};
      state.message = message;
    },

    [resetUserPassword.fulfilled]: (state, {payload}) => {
      if (state.message) {
        console.log("hesa ara messagey ay tufta");
        state.message = "";
        console.log(state.message);
      }
      const { status, error, data } = payload;
      const { token = "", ...userInfo } = data || {};
      const { message = "" } = error || {};


      [state.message, state.userInfo, state.token] = [message, userInfo, token];

      state.token && Cookies.set('token', `${token}`, { expires: 1 })
      userInfo?.id && Cookies.set('id', `${userInfo.id}`, { expires: 1 })

      state.isLoading = false;

    }

  },
});

export const { updateRoute } = getUser.actions;

export default getUser.reducer;
