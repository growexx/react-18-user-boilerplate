import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  appLoading: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadApp: (state, action) => {
      return {
        ...state,
        appLoading: action.payload,
      };
    },
  },
});

export const { loadApp } = appSlice.actions;

export default appSlice.reducer;
