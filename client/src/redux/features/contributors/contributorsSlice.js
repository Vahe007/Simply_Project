import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";
// Contributors

const initialState = {
  contributors: [],
  loading: false,
};

export const selectContributors = (state) => state.contributors;

export const getContributors = createAsyncThunk("contributors", async () => {
  const response = await fetch(`${BASE_URL}contributors`);
  return response.json();
});

export const createAndGetContributors = createAsyncThunk(
  "createAndGetContributors",
  async (data) => {
    const response = await fetch(`${BASE_URL}contributors`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response2 = await fetch(`${BASE_URL}contributors`);

    return {
      createResponse: await response.json(),
      getResponse: await response2.json(),
    };
  }
);

export const updateAndGetContributors = createAsyncThunk(
  "updateAndGetContributors",
  async ({ id, newData }) => {
    const response = await fetch(`${BASE_URL}contributors/${id}`, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response2 = await fetch(`${BASE_URL}contributors`);
    return response2.json();
  }
);

export const deleteContributor = createAsyncThunk(
  "deleteContributor",
  async (id) => {
    const response = await fetch(`${BASE_URL}contributor/${id}`, {
      method: "DELETE",
      body: id,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
);

const contributorsSlice = createSlice({
  name: "contributors",
  initialState,
  reducers: {},
  extraReducers: {
    [getContributors.pending]: (state) => {
      state.loading = true;
    },

    [getContributors.fulfilled]: (state, action) => {
      state.contributors = action.payload.data;
      state.loading = false;
    },

    [getContributors.rejected]: (state) => {
      state.loading = false;
    },

    [createAndGetContributors.pending]: (state) => {
      state.loading = true;
    },

    [createAndGetContributors.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.contributors = payload.data;
    },

    [createAndGetContributors.rejected]: (state, action) => {
      state.loading = false;
    },

    [updateAndGetContributors.pending]: (state, action) => {
      state.loading = true;
    },

    [updateAndGetContributors.fulfilled]: (state, action) => {
      state.contributors = action.payload.data;
      state.loading = false;
    },

    [updateAndGetContributors.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default contributorsSlice.reducer;
