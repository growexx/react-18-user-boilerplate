import { createSlice } from '@reduxjs/toolkit';

export const initialState = {};

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {
    changePasswordSubmit: (state, action) => {
      // add change password logic here
    },
  },
});

export const { changePasswordSubmit } = changePasswordSlice.actions;

export default changePasswordSlice.reducer;
