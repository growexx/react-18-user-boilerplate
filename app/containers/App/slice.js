import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appLoading: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadApp: (state, action) => ({
      ...state,
      appLoading: action.payload,
    }),
  },
});

export const { loadApp } = appSlice.actions;

export default appSlice.reducer;
