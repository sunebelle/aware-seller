import { configureStore } from "@reduxjs/toolkit";
// import uiReducer from "./ui";
import authReducer from "./auth";
const store = configureStore({
  reducer: {
    // ui: uiReducer,
    auth: authReducer,
  },
});
export default store;
