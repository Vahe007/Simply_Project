import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../constants";
// Contributors

const initialState = {
  contributorsPerScroll: [],
  contributorsByChunk: [],
  loading: false,
  page: 1,
  hasMore: true,
  allContributors: [],
};

export const selectContributors = (state) => state.contributors;

export const getAllContributors = createAsyncThunk(
  "getAllContributors",
  async () => {
    const response = await fetch(`${BASE_URL}contributors`);
    return response.json();
  }
);

export const getContributors = createAsyncThunk(
  "getContributors",
  async ({ page, limit, contains }) => {
    const response = await fetch(
      `${BASE_URL}contributors?page=${page}&limit=${limit}&contains=${
        contains || ""
      }`
    );
    return response.json();
  }
);

export const searchContributors = createAsyncThunk(
  "searchContributors",
  async ({ page, limit, contains }) => {
    const response = await fetch(
      `${BASE_URL}contributors?page=${page}&limit=${limit}&contains=${
        contains || ""
      }`
    );
    return response.json();
  }
);

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
  async ({ id, newData, page, limit }) => {
    const response = await fetch(`${BASE_URL}contributors/${id}`, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response2 = await fetch(
      `${BASE_URL}contributors?page=${1}&limit=${15}`
    );
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
  reducers: {
    increasePage: (state, action) => {
      state.page += 1;
    },
    decreasePage: (state) => {
      state.contributorsByChunk = [];
      state.contributorsPerScroll = [];
      state.page = 1;
    },
    setHasMoreToTrue: (state, action) => {
      state.hasMore = true;
    },
  },
  extraReducers: {
    [getContributors.pending]: (state) => {
      state.loading = true;
    },

    [getContributors.fulfilled]: (state, action) => {
      state.contributorsPerScroll = action.payload.data;

      if (!state.contributorsPerScroll.length) {
        state.hasMore = false;
        state.loading = false;
      }
      if (state.hasMore) {
        state.contributorsByChunk = [
          ...state.contributorsByChunk,
          ...state.contributorsPerScroll,
        ];
        state.loading = false;
      }
    },

    // state.allContributors = [];
    //

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
      state.contributorsPerScroll = action.payload.data;
      state.contributorsByChunk = action.payload.data;
      state.page = 1;
      state.hasMore = true;
      state.loading = false;
    },

    [updateAndGetContributors.rejected]: (state, action) => {
      state.loading = false;
    },

    [searchContributors.pending]: (state) => {
      state.loading = true;
    },

    [searchContributors.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.contributorsByChunk = [];
      state.page = 1;
      state.hasMore = true;
      state.contributorsPerScroll = payload.data;
      state.contributorsByChunk = [...state.contributorsPerScroll];
    },

    [searchContributors.rejected]: (state, action) => {
      state.loading = false;
    },

    [getAllContributors.pending]: (state) => {
      state.loading = true;
    },

    [getAllContributors.fulfilled]: (state, { payload }) => {
      console.log(payload);

      state.loading = false;
      state.allContributors = payload.data;
    },

    [getAllContributors.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { increasePage, decreasePage, setHasMoreToTrue } =
  contributorsSlice.actions;

export default contributorsSlice.reducer;
