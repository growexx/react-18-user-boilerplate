import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appLoading: false,
};

export const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    loadApp: (state, action) => ({
      ...state,
      appLoading: action.payload,
    }),
  },
});

export const { loadApp } = appSlice.actions;

export default appSlice.reducer;
