import { configureStore } from '@reduxjs/toolkit';
import StorageService from 'utils/StorageService';
import languageSlice, { twoFactorFormSubmit } from '../slice';

jest.mock('utils/StorageService', () => ({
  set: jest.fn(),
}));

describe('TwoFactorAuthentication Slice', () => {
  const store = configureStore({
    reducer: {
      language: languageSlice,
    },
  });
  it('should set data', () => {
    store.dispatch(twoFactorFormSubmit());
    expect(StorageService.set).toHaveBeenCalled();
  });
});
