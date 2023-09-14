import { configureStore } from '@reduxjs/toolkit';
import languageSlice, { changeLocale } from '../slice';

describe('LanguageProvider Slice', () => {
  const store = configureStore({
    reducer: {
      language: languageSlice,
    },
  });
  it('should change language when changeLocal is dispatched', () => {
    store.dispatch(changeLocale('en'));
    const state = store.getState().language;
    expect(state.locale).toEqual('en');
  });
});
