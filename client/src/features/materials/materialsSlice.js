import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";


export const getMaterials = createAsyncThunk('materials', async () => {
    const response = await fetch(`${BASE_URL}materials/active`);
    return response.json();
})

const initialState = {
    allMaterials: []
}

const materials = createSlice({
    name: 'materials',
    initialState,
    reducers: {
    },

    extraReducers: {
        [getMaterials.pending]: (state) => {
            console.log('ok');
        },
        [getMaterials.fulfilled]: (state, {payload}) => {
            console.log('fulfiled', payload);
            state.allMaterials = payload.data;
        },
        [getMaterials.rejected]: (state, {payload}) => {
            console.log('rejected', payload);
        } 
    }
})

export default materials.reducer;