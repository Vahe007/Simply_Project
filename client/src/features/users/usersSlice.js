import { baseUrl } from "../../helpers/common.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    usersPerPage: [],
    count: 0,
    loading: false,
    error: null,
}
export const selectUsers = state => state.users;

export const createUser = createAsyncThunk("addUser", async(data) => {
    const response = await fetch(`${baseUrl}users`, {
        method:"POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json()
})


export const getUsersPerPage = createAsyncThunk("users", async({page, sortBy, limit, contains}) => {
    const response = await fetch(`${baseUrl}users?page=${page}&sortBy=${sortBy}&limit=${limit}&contains=${contains || ""}`);
    return response.json()
})

export const updateUser = createAsyncThunk("updateUser", async({id, newData}) => {
    const response = await fetch(`${baseUrl}users/${id}`, {
        method: "PUT",
        body: JSON.stringify(newData),
        headers: {
            "Content-Type": "application/json"
        }
    })

    return response.json();
}) 

export const getAllEmails = createAsyncThunk("getEmails", async() => {
  const response = await fetch(`${baseUrl}users/emails`)

  return response.json();
}) 

export const deleteUser = createAsyncThunk("deleteUser", async(id) => {
    const response = await fetch(`${baseUrl}users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.json();
}) 

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
    },
    extraReducers:  {
          [createUser.pending]: state => {
            state.loading = true;
          },

          [createUser.fulfilled]: (state, { payload }) => {
            console.log(payload);
            const { error } = payload.data;
            if(error) {
              if(error.code === 'P2002') {
                  state.error = "Email is already registered"
              }
            }
            state.loading = false;
          },

          [createUser.rejected]: (state, action) => {
            state.loading = false;
          },

          [getUsersPerPage.pending]: state => {
            state.loading = true
          },

          [getUsersPerPage.fulfilled]: (state, action) => {
            state.loading = false;
            state.usersPerPage = action.payload.data.usersPerPage;
            state.allUsers = action.payload.data.allUsers
            state.filteredUsers = action.payload.data.users
            state.count = action.payload.data.count
          },

          [getUsersPerPage.rejected]: state => {
            state.loading = false;
          },

          [updateUser.pending]: state => {
            state.loading = true;
          },

          [updateUser.fulfilled]: state => {
            state.loading = false;
          },

          [updateUser.rejected]: state => {
            state.loading = false;
          },

          [deleteUser.pending]: state => {
            state.loading = true;
          },

          [deleteUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.onUserDelete = !state.onUserDelete
          },

          [deleteUser.rejected]: (state, action) => {
            state.loading = false;
          },

          [getAllEmails.pending]: state => {
            state.loading = true;
          },

          [getAllEmails.fulfilled]: (state, action) => {
            state.loading = false;
            state.allEmails = action.payload.data.data
          },

          [getAllEmails.rejected]: (state, action) => {
            state.loading = false;
          },
   }
})

export default usersSlice.reducer;