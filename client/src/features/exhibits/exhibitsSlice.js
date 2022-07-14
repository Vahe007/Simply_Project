import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";

export const getExhibitsPerPage = createAsyncThunk("exhibits", async({page = 1, sortBy='', limit = 5, contains='', material='', category=''}) => {
    const response = await fetch(`${BASE_URL}exhibits?page=${page}&sortBy=${sortBy}&limit=${limit}&contains=${contains}&material=${material}&category=${category}`);
    return response.json()
})
export const createExhibit = createAsyncThunk("addExhibit", async(data) => {
    const response = await fetch(`${BASE_URL}exhibits`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
})
export const update_getExhibit = createAsyncThunk("editExhibit", async({page = 1, sortBy='', limit = 4, contains='', material='', category='', id, exhibitInfo}) => {
    await fetch(`${BASE_URL}exhibits/${id}`, {
        method: "PUT",
        body: JSON.stringify(exhibitInfo),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const response = await fetch(`${BASE_URL}exhibits?page=${page}&sortBy=${sortBy}&limit=${limit}&contains=${contains}&material=${material}&category=${category}`);
    console.log('data', await response.json());
    return response.json();
})

export const deleteExhibit = createAsyncThunk("deleteExhibit", async (id) => {
    const response = await fetch(`${BASE_URL}exhibits/${id}`, {
        method: "DELETE",
        body: id,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await response.json();
})


const initialState = {
    count: 0,
    filteredCount: 0,
    exhibitsPerPage: [],
    loading: false,
    error: null,
    sortBy: ''
}

const exhibits = createSlice({
    name: "exhibits",
    initialState,

    reducers: {
    },

    extraReducers: {
        [getExhibitsPerPage.pending]: (state) => {
            state.loading = true;
        },
        [getExhibitsPerPage.fulfilled]: (state, {payload}) => {
            state.exhibitsPerPage = payload.data.exhibitsPerPage;
            state.count = payload.data.count;
            state.filteredCount = payload.data.filteredCount;
            state.loading = false;
        },
        [getExhibitsPerPage.rejected]: (state, {payload}) => {
            state.loading = false;
        },

        

        [update_getExhibit.pending]: (state) => {
            state.loading = true;
        },
        [update_getExhibit.fulfilled]: (state, {payload}) => {
            state.exhibitsPerPage = payload.data.exhibitsPerPage;
            state.count = payload.data.count;
            state.filteredCount = payload.data.filteredCount;
            state.loading = false;
        },
        [update_getExhibit.rejected]: (state, {payload}) => {
            state.loading = false;
        },


        [createExhibit.pending]: (state) => {
            state.loading = true;
        },
        [createExhibit.fulfilled]: (state) => {
            state.loading = false;
        },
        [createExhibit.rejected]: (state) => {
            state.loading = false;
        }
    }
})

export default exhibits.reducer;

