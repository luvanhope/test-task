import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingProduct = state.cartProducts.find(
        (p) => p.productId === action.payload.productId,
      );
      if (existingProduct) {
        existingProduct.count += 1;
      } else {
        state.cartProducts.push({
          ...action.payload,
          count: action.payload.count || 1,
          price: action.payload.price || 0,
        });
      }
    },
    deleteFromCart(state, action) {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.productId !== action.payload,
      );
    },
    updateCartItem(state, action) {
      const { productId, field, value } = action.payload;
      const product = state.cartProducts.find((p) => p.productId === productId);
      if (product) {
        product[field] = Number(value);
      }
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, deleteFromCart, updateCartItem } = cartSlice.actions;
