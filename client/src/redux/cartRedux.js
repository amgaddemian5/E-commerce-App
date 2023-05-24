import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const productInCartIndex = state.products.findIndex(
        (product) => product._id === action.payload._id,
      );
      if (productInCartIndex !== -1) {
        state.products[productInCartIndex].quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
        state.quantity += 1;
      }

      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      if (state.quantity > 0) {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id,
        );
        if (state.products[index].quantity === 1) {
          state.products.splice(index, 1);
          state.quantity -= 1;
        } else {
          state.products[index].quantity--;
        }
        state.total -= action.payload.price;
      }
    },
    increaseProduct: (state, action) => {
      const prodIndex = state.products.findIndex(
        (product) => product._id === action.payload._id,
      );
      state.products[prodIndex].quantity += 1;
      state.total += action.payload.price;
    },
  },
});

export const { addProduct, removeProduct, increaseProduct } = cartSlice.actions;
export default cartSlice.reducer;
