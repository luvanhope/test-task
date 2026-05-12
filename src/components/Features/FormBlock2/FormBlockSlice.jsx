import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  organizations: [],
  payboxes: [],
  warehouses: [],
  priceTypes: [],

  selected: {
    paybox: "",
    organization: "",
    warehouse: "",
    priceType: "",
  },

  loading: false,
  error: null,
};

export const fetchOrganizations = createAsyncThunk(
  "form/fetchOrganizations",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://app.tablecrm.com/api/v1/organizations/?token=${token}`,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchPayboxes = createAsyncThunk(
  "form/fetchPayboxes",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://app.tablecrm.com/api/v1/payboxes/?token=${token}`,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchWarehouses = createAsyncThunk(
  "form/fetchWarehouses",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://app.tablecrm.com/api/v1/warehouses/?token=${token}`,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchPriceTypes = createAsyncThunk(
  "form/fetchPriceTypes",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://app.tablecrm.com/api/v1/price_types/?token=${token}`,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setSelectedField(state, action) {
      const { field, value } = action.payload;
      state.selected[field] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.organizations = Array.isArray(action.payload.result)
          ? action.payload.result
          : [];
      })
      .addCase(fetchPayboxes.fulfilled, (state, action) => {
        state.payboxes = Array.isArray(action.payload.result)
          ? action.payload.result
          : [];
      })
      .addCase(fetchWarehouses.fulfilled, (state, action) => {
        state.warehouses = Array.isArray(action.payload.result)
          ? action.payload.result
          : [];
      })
      .addCase(fetchPriceTypes.fulfilled, (state, action) => {
        state.priceTypes = Array.isArray(action.payload.result)
          ? action.payload.result
          : [];
      });
  },
});

export const { setSelectedField } = formSlice.actions;
export default formSlice.reducer;
