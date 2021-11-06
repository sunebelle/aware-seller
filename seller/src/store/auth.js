import { createSlice } from "@reduxjs/toolkit";

const authInitial = {
  isAuthenticated: false,
  user: JSON.parse(localStorage.getItem("profile")),
};
const authSlice = createSlice({
  name: "authentication",
  initialState: authInitial,
  reducers: {
    auth(state, action) {
      state.isAuthenticated = true;
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.user = action.payload;
    },
    logOut(state) {
      state.isAuthenticated = false;
      localStorage.removeItem("profile");
      state.user = null;
    },
  },
});
export const authActions = authSlice.actions;

export default authSlice.reducer;
