import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  loading: true,
  error: null,
  searchedText: "",
};

export const fetchProducts = createAsyncThunk(
  "Products/fetchProducts",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://app.tablecrm.com/api/v1/nomenclature/?token=${token}`,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const prodcutsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    setText(state, action) {
      state.searchedText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.result;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default prodcutsSlice.reducer;
export const { setText } = prodcutsSlice.actions;
