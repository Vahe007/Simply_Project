import { baseUrl } from "../../helpers/common.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  usersPerPage: [],
  count: 1,
  countAfterSearch: 1,
  loading: false,
  error: {
    isError: false,
    message: ""
  }
};
export const selectUsers = (state) => state.users;

export const createAndGetUsers = createAsyncThunk("addUser", async ({data, queries}) => {
  const {page, limit, sortBy, contains, isActive} = queries;

  const response = await fetch(`${baseUrl}users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response2 = await fetch(
    `${baseUrl}users?page=${page}&sortBy=${
      sortBy || ""
    }&limit=${limit}&contains=${contains || ""}&isActive=${isActive || ""}`
  );

  return {
    updateResponse: await response.json(),
    getResponse: await response2.json()
  };
});

export const getUsersPerPage = createAsyncThunk("users", async (queries) => {
  const { page, sortBy = "", limit, contains = "", isActive="" } = queries;
  const response = await fetch(
    `${baseUrl}users?page=${page}&sortBy=${
      sortBy || ""
    }&limit=${limit}&contains=${contains || ""}&isActive=${isActive || ""}`
  );
  return response.json();
});

export const updateAndGetUsers = createAsyncThunk("updateAndGetUsers",async ({ id, newData, queries }) => {
    const {page, limit, sortBy, contains, isActive} = queries;
    const response = await fetch(`${baseUrl}users/${id}`, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response2 = await fetch(
      `${baseUrl}users?page=${page}&sortBy=${sortBy}&limit=${limit}&contains=${
        contains || ""
      }&isActive=${isActive}`
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
  reducers: {
  },
  extraReducers: {
    [createAndGetUsers.pending]: (state) => {
      state.loading = true;
    },

    [createAndGetUsers.fulfilled]: (state, { payload }) => {
      const { error } = payload.updateResponse;
      if (error && error.code === "P2002") {
        state.error = {
          isError: true,
          message:"Email is already registered"
        };
      } else {
        state.error = {
          isError: false,
          message: ""
        };
      }
      state.loading = false;
      state.usersPerPage = payload.getResponse.data.usersPerPage
      state.count = payload.getResponse.data.count
      state.countAfterSearch = payload.getResponse.data.countAfterSearch;

    },

    [createAndGetUsers.rejected]: ({ loading }, action) => {
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

    [updateAndGetUsers.pending]: (state) => {
      state.loading = true;
      
    },

    [updateAndGetUsers.fulfilled]: (state, action) => {
      const { error } = action.payload;
      if (error && error.code === "P2002") {
        state.error = {
          isError: true,
          message:"Email is already registered"
        };
      } else {
        state.error = {
          isError: false,
          message: ""
        };
      }
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

export const {setErrorToNull} = usersSlice.actions;

export default usersSlice.reducer;
