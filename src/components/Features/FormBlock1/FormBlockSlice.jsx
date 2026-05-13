import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: "",
  confirmToken: false,
  error: null,
  loading: false,
};

export const chekToken = createAsyncThunk(
  "FormBlock1/checkToken",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://app.tablecrm.com/api/v1/contragents/?token=${token}`,
      );

      return res.data;
    } catch (error) {
      if (error.status === 403) {
        return rejectWithValue("токен не найден");
      }
      return rejectWithValue(error.message);
    }
  },
);

const FormBlock1Slice = createSlice({
  name: "FormToken",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      state.confirmToken = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(chekToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(chekToken.fulfilled, (state, action) => {
        state.loading = false;
        state.confirmToken = true;
      })
      .addCase(chekToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default FormBlock1Slice.reducer;
export const { setToken } = FormBlock1Slice.actions;
