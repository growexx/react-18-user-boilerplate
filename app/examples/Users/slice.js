import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {};

export const usersExampleSlice = createSlice({
  name: 'usersExample',
  initialState: initialUserState,
  reducers: {
    updateUserFormField: (state, action) => {
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
      };
    },
  },
});

export const { updateUserFormField } = usersExampleSlice.actions;

export default usersExampleSlice.reducer;
