import { baseUrl } from "../../helpers/common.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  usersPerPage: [],
  count: 1,
  countAfterSearch: 1,
  loading: false,
  error: null,
};
export const selectUsers = (state) => state.users;

export const createUser = createAsyncThunk("addUser", async (data) => {
  const response = await fetch(`${baseUrl}users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
});

export const getUsersPerPage = createAsyncThunk("users", async (queries) => {
  const { page, sortBy = "", limit, contains } = queries;
  const response = await fetch(
    `${baseUrl}users?page=${page}&sortBy=${
      sortBy || ""
    }&limit=${limit}&contains=${contains || ""}`
  );
  return response.json();
});

export const getActiveUsers = createAsyncThunk(
  "activeUsers",
  async (queries) => {
    console.log(queries);
    const { page, sortBy = "", limit, contains } = queries;
    const response = await fetch(
      `${baseUrl}users/active?page=${page}&sortBy=${sortBy}&limit=${limit}&contains=${
        contains || ""
      }`
    );
    return response.json();
  }
);

export const updateAndGetUsers = createAsyncThunk("updateAndGetUsers",async ({ id, newData, queries }) => {
  console.log(queries);
    const {page, limit, sortBy, contains} = queries;
    const response = await fetch(`${baseUrl}users/${id}`, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response2 = await fetch(
      `${baseUrl}users/active?page=${page}&sortBy=${sortBy}&limit=${limit}&contains=${
        contains || ""
      }`
    );

    return response2.json();
  }
);

export const getAllEmails = createAsyncThunk("getEmails", async () => {
  const response = await fetch(`${baseUrl}users/emails`);

  return response.json();
});

export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  const response = await fetch(`${baseUrl}users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
    },

    [createUser.fulfilled]: (state, { payload }) => {
      const { error } = payload;
      if (error) {
        alert("hii");
        error.code === "P2002" && (state.error = "Email is already registered");
      }

      state.loading = false;
      console.log(state.error);
    },

    [createUser.rejected]: ({ loading }, action) => {
      loading = false;
    },

    [getUsersPerPage.pending]: ({ loading }) => {
      loading = true;
    },

    [getUsersPerPage.fulfilled]: (state, action) => {
      const { data } = action.payload;
      const { usersPerPage: actionUsersPerPage, count: actionCount } = data;
      [state.loading, state.usersPerPage, state.count] = [
        false,
        actionUsersPerPage,
        actionCount,
      ];
      state.countAfterSearch = action.payload.data.countAfterSearch;
    },

    [getUsersPerPage.rejected]: (state) => {
      state.loading = false;
    },

    [getActiveUsers.pending]: ({ loading }) => {
      loading = true;
    },

    [getActiveUsers.fulfilled]: (state, action) => {
      const { data } = action.payload;
      const { usersPerPage: actionUsersPerPage, count: actionCount } = data;
      [state.loading, state.usersPerPage, state.count] = [
        false,
        actionUsersPerPage,
        actionCount,
      ];
      state.countAfterSearch = action.payload.data.countAfterSearch;
    },

    [getActiveUsers.rejected]: (state) => {
      state.loading = false;
    },

    [updateAndGetUsers.pending]: (state) => {
      state.loading = true;
      
    },

    [updateAndGetUsers.fulfilled]: (state, action) => {
      console.log(action);
      state.usersPerPage = action.payload.data.usersPerPage
      state.loading = false;
    },

    [updateAndGetUsers.rejected]: (state) => {
      state.loading = false;
    },

    [deleteUser.pending]: (state) => {
      state.loading = true;
    },

    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.onUserDelete = !state.onUserDelete;
    },

    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
    },

    [getAllEmails.pending]: (state) => {
      state.loading = true;
    },

    [getAllEmails.fulfilled]: (state, action) => {
      state.loading = false;
      state.allEmails = action.payload.data.data;
    },

    [getAllEmails.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default usersSlice.reducer;
