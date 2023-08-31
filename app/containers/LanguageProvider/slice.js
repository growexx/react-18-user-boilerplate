import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_LOCALE } from '../../i18n';

export const initialState = {
  locale: DEFAULT_LOCALE,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLocale: (state, action) => ({
      ...state,
      locale: action.payload,
    }),
  },
});

export const { changeLocale } = languageSlice.actions;
export default languageSlice.reducer;
