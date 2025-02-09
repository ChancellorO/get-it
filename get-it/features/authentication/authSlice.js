import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: "",
    email: "",
    fname: "",
    lname: "",
    tags: []
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.fname = action.payload.fname;
        state.lname = action.payload.lname;
        state.tags = action.payload.tags;
    },
    logout: state => {
        state.username = "";
        state.email = "";
        state.fname = "";
        state.lname = "";
        state.tags = [];
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;