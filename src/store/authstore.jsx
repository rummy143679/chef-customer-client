import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  token: null,
  isAuthenticated: localStorage.getItem("user") ? true : false,
};

const authSlicer = createSlice({
  name: "authorisarion",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const user = action.payload.user;
      state.isAuthenticated = user ? true : false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logOut } = authSlicer.actions;
export default authSlicer.reducer;
