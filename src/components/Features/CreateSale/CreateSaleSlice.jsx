import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createSale = createAsyncThunk(
  "sales/createSale",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://app.tablecrm.com/api/v1/docs_sales/?token=${token}`,
        payload,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const salesSlice = createSlice({
  name: "sales",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createSale.pending, (state) => {
        state.loading = true;
      })

      .addCase(createSale.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(createSale.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default salesSlice.reducer;
