import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_LOCALE } from '../../i18n';

export const initialState = {
  locale: DEFAULT_LOCALE,
};

const themeSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLocale: (state, action) => {
      return {
        ...state,
        locale: action.payload,
      };
    },
  },
});

export const { changeLocale } = themeSlice.actions;
export default themeSlice.reducer;
