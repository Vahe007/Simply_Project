import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { baseUrl } from "../../helpers/common";

const initialState = {
    materials: [],
    count: 0,
    loading: false
}

export const getMaterials = createAsyncThunk("getAllMaterials", async () => {
    const response = await fetch(`${baseUrl}materials`);

    return response.json();
})

export const createMaterial = createAsyncThunk("createMaterial", async (data) => {
    const response = await fetch(`${baseUrl}materials`, {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
})
const materialsSlice = createSlice({
    name: "materials",
    initialState,

    reducer: {

    },

    extraReducers: {
        [getMaterials.pending]: (state, action) => {
            state.loading = true
        },

        [getMaterials.fulfilled]: (state, action) => {
            state.materials = action.payload.data;
            state.loading = false;
        },

        [getMaterials.rejected]: (state, action) => {
            state.loading = false;
        },

        [createMaterial.pending]: (state, action) => {
            state.loading = true
        },

        [createMaterial.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.loading = false;
        },

        [createMaterial.rejected]: (state, action) => {
            state.loading = false;
        },

    }
})

export const selectMaterials = state => state.materials;

export default materialsSlice.reducer;