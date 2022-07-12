import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";

const initialState = {
  allMaterials: [],
  filteredMaterials: [],
  count: 0,
  loading: false,
  error: {
    isError: false,
    message: "",
  },
};
export const selectMaterials = (state) => state.materials;

export const getMaterials = createAsyncThunk(
  "getMaterials",
  async ({ isActive = "" }) => {
    console.log("hii");
    const response = await fetch(`${BASE_URL}materials?isActive=${isActive}`);
    return response.json();
  }
);

export const createAndGetMaterials = createAsyncThunk(
  "createAndGetMaterials",
  async ({ data, isActive }) => {
    const response = await fetch(`${BASE_URL}materials`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response2 = await fetch(`${BASE_URL}materials?isActive=${isActive}`);

    return {
      createResponse: await response.json(),
      getResponse: await response2.json(),
    };
  }
);

export const updateMaterial = createAsyncThunk(
  "updateMaterial",
  async ({ id, newData, isActive }) => {
    const response = await fetch(`${BASE_URL}materials/${id}`, {
      method: "put",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response2 = await fetch(`${BASE_URL}materials?isActive=${isActive}`);

    return response2.json();
  }
);

const materialsSlice = createSlice({
  name: "materials",
  initialState,

  reducers: {
    changeChecked: (state, action) => {
      const { id, checked } = action.payload;
      state.filteredMaterials.find((material) => material.id === id).checked =
        checked;
    },

    getActiveMaterials: (state, action) => {
      const activeMaterials = state.allMaterials.filter(
        (material) => material.isActive === true
      );
      console.log(`activeMaterials = ` + activeMaterials);
      state.filteredMaterials = activeMaterials;
    },

    getInactiveMaterials: (state) => {
      const inActiveMaterials = state.allMaterials.filter(
        (material) => material.isActive === false
      );
      state.filteredMaterials = inActiveMaterials;
    },
  },

  extraReducers: {
    [getMaterials.pending]: (state, action) => {
      state.loading = true;
    },

    [getMaterials.fulfilled]: (state, action) => {
      state.allMaterials = action.payload.data;
      state.filteredMaterials = action.payload.data;
      state.loading = false;
    },

    [getMaterials.rejected]: (state, action) => {
      state.loading = false;
    },

    [createAndGetMaterials.pending]: (state, action) => {
      state.loading = true;
    },

    [createAndGetMaterials.fulfilled]: (state, { payload }) => {
      console.log(payload);
      if (
        payload.createResponse.error &&
        payload.createResponse.error.code === "P2002"
      ) {
        state.error = {
          isError: true,
          message: "material Already Exists",
        };
      } else {
        state.error = {
          isError: false,
          message: "",
        };
      }
      state.loading = false;
      state.allMaterials = payload.getResponse.data;
      state.filteredMaterials = payload.getResponse.data;
    },

    [createAndGetMaterials.rejected]: (state, action) => {
      state.loading = false;
    },

    [updateMaterial.pending]: (state, action) => {
      state.loading = true;
    },

    [updateMaterial.fulfilled]: (state, action) => {
      state.allMaterials = action.payload.data;
      state.filteredMaterials = action.payload.data;
      state.loading = false;
    },

    [updateMaterial.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const {
  changeChecked,
  getActiveMaterials,
  uncheckAllMaterials,
  getInactiveMaterials,
} = materialsSlice.actions;

export default materialsSlice.reducer;
