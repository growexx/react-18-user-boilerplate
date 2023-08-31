import { createSlice } from '@reduxjs/toolkit';

export const usersExampleSlice = createSlice({
  name: 'usersExample',
  initialState: {},
  reducers: {
    updateUserFormField: (state, action) => {
      const { key, payload } = action;
      return {
        ...state,
        [key]: payload,
      };
    },
  },
});

export const { updateUserFormField } = usersExampleSlice.actions;

export default usersExampleSlice.reducer;
