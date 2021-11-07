import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category"
import authReducer from "./auth";
const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
  },
});
export default store;
