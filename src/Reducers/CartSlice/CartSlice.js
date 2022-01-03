import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const cartItems = createAsyncThunk("cart/cartItems", async (email) => {
  const response = await axios(`http://localhost:5000/cart/${email}`);
  return response.data;
});

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    cartLoading: true,
  },

  reducers: {
    setCartLoading: (state, action) => {
      state.cartLoading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(cartItems.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

export const { setCartLoading, setCart } = cartSlice.actions;
export const selectCart = (state) => state.cart.cart;
export const selectCartLoading = (state) => state.cart.cartLoading;
export default cartSlice.reducer;
