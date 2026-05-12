import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  clients: [],
  error: null,
  loading: false,
  searchedNumber: "",
  selectedClient: null,
};

export const fetchClients = createAsyncThunk(
  "FormBlock2/fetchClients",
  async (token, { rejectWithValue }) => {
    try {
      if (!token) return rejectWithValue("Токен отсутствует");

      const res = await axios.get(
        `https://app.tablecrm.com/api/v1/contragents/?token=${token}`,
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

const SearchClientSlice = createSlice({
  name: "Clients",
  initialState,
  reducers: {
    setSearchNumber(state, action) {
      state.searchedNumber = action.payload;
    },
    setSelectedClient(state, action) {
      state.selectedClient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;

        if (Array.isArray(action.payload.result)) {
          state.clients = action.payload.result;
        } else {
          state.clients = [];
        }
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchNumber, setSelectedClient } = SearchClientSlice.actions;
export default SearchClientSlice.reducer;
