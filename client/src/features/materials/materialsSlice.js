import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";

const initialState = {
    allMaterials: [],
    filteredMaterials: [],
    count: 0,
    loading: false
}

export const getMaterials = createAsyncThunk("getAllMaterials", async () => {
    const response = await fetch(`${BASE_URL}materials`);
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

export const updateMaterial = createAsyncThunk("updateMaterial", async ({id, newData}) => {
    if(Array.isArray(id)) {
        const response = await fetch(`${baseUrl}materials/${id}`, {
            method: "put",
            body: JSON.stringify(newData),
            headers: {
                "Content-Type": "application/json"
            }
        });
    } else {
        const response = await fetch(`${baseUrl}materials/${id}`, {
            method: "put",
            body: JSON.stringify(newData),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

   
})


const materialsSlice = createSlice({
    name: "materials",
    initialState,

    reducers: {
        changeChecked: (state, action) => {
            const {id, checked} = action.payload;
            state.filteredMaterials.find(material => material.id === id).checked = checked;
        },

        getActiveMaterials: (state, action) => {
            const activeMaterials = state.allMaterials.filter(material => material.isActive === true);
            console.log(`activeMaterials = ` + activeMaterials);
            state.filteredMaterials = activeMaterials;
        },

        getInactiveMaterials: (state) => {
            const inActiveMaterials = state.allMaterials.filter(material => material.isActive === false);
            state.filteredMaterials = inActiveMaterials;
        }
    },

    extraReducers: {
        [getMaterials.pending]: (state, action) => {
            state.loading = true
        },

        [getMaterials.fulfilled]: (state, action) => {
            state.allMaterials = action.payload.data
            state.filteredMaterials = action.payload.data;
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

        [updateMaterial.pending]: (state, action) => {
            state.loading = true
        },

        [updateMaterial.fulfilled]: (state, action) => {
            state.loading = false;
        },

        [updateMaterial.rejected]: (state, action) => {
            state.loading = false;
        },

    }
})

export const {changeChecked, getActiveMaterials, uncheckAllMaterials, getInactiveMaterials} = materialsSlice.actions;

export const selectMaterials = state => state.materials.filteredMaterials;

export default materialsSlice.reducer;