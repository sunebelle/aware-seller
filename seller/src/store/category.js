import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  subCategories: [],
  orders: [],
};
const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    getSubCategories(state, action) {
      state.subCategories = action.payload;
    },
    getCategories(state, action) {
      state.categories = action.payload;
    },
    getOrders(state, action) {
      state.orders = action.payload;
    },
  },
});
export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;
