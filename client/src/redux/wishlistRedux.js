import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
    name: "wishlist",
    initialState: {
        products: [],
        quantity: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
        },

        deleteProduct: (state, action) => {
            if (state.quantity > 0) {
                state.quantity -= 1;
                const index = state.products.findIndex(
                    (element) => element._id === action.payload._id
                );
                state.products.splice(index, 1);
            }
        },
    },
});

export const { addProduct, deleteProduct } = wishListSlice.actions;
export default wishListSlice.reducer;