import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";

export const getImage = createAsyncThunk('exhibit/image', async(imgPath) => {
    const data = await fetch(`${BASE_URL}images${imgPath}`);
    return data.json();
})

const initialState = {
    image: '',
    isLoaing: false
}

const image = createSlice({
    name: 'image',
    initialState,

    reducers: {
    },

    extraReducers: {
        [getImage.pending]: (state) => {
            state.isLoaing = true;
        },
        [getImage.fulfilled]: (state, {payload}) => {
            state.image = payload;
            state.isLoaing = false;
        },
        [getImage.rejected]: (state) => {
            state.isLoaing = false;
        }
    }
})

export default image.reducer;
