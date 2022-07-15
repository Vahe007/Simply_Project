import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";


export const getMaterials = createAsyncThunk('materials', async () => {
    const response = await fetch(`${BASE_URL}materials`);
    return response.json();
})

export const getCategories = createAsyncThunk("categories", async () => {
    const response = await fetch(`${BASE_URL}categories`);
    return response.json();
})

const initialState = {
    allMaterials: [],
    allCategories: [],
}

const filteringFeatures = createSlice({
    name: 'filteringFeatures',
    initialState,
    reducers: {
    },

    extraReducers: {
        [getMaterials.pending]: (state) => {
        },
        [getMaterials.fulfilled]: (state, {payload}) => {
            state.allMaterials = payload.data;
        },
        [getMaterials.rejected]: (state) => {
        },

        [getCategories.pending]: (state) => {
        },
        [getCategories.fulfilled]: (state, {payload}) => {
            state.allCategories = payload.data;
        },
        [getCategories.rejected]: (state) => {
        } 
    }
})

export default filteringFeatures.reducer;