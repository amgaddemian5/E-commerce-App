import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    allProducts: [],
  },
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts.push(...action.payload);
    },
  },
});

export const { setAllProducts } = productSlice.actions;
export default productSlice.reducer;
