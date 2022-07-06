import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";


export const getExhibitsPerPage = createAsyncThunk("exhibits", async({page = 1, sortBy = "", limit = 10, contains = ""}) => {
    const response = await fetch(`${BASE_URL}exhibits?page=${page}&sortBy=${sortBy}&limit=${limit}&contains=${contains}`);
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


const initialState = {
    exhibitsPerPage: [],
    count: 0,
    loading: false,
    error: null,
}

export const selectExhibits = state => state.exhibits;

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
            console.log(payload);
            state.exhibitsPerPage = payload.data;
            state.count = payload.count;
            state.loading = false;

        },
        [getExhibitsPerPage.rejected]: (state, {payload}) => {
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