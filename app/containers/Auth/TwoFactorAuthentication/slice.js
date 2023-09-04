import { createSlice } from '@reduxjs/toolkit';

import Emitter from 'utils/events';
import StorageService from '../../../utils/StorageService';
import {
  EMITTER_EVENTS,
  TOKEN_KEY,
  USER_DATA_KEY,
} from '../../../utils/constants';
import { loginSuccessResponse } from '../Login/stub/login.stub';

export const initialState = {};

const twoFactorAuthSlice = createSlice({
  initialState,
  name: 'twoFactorAuth',
  reducers: {
    twoFactorFormSubmit: () => {
      StorageService.set(TOKEN_KEY, loginSuccessResponse.data.token);
      StorageService.set(USER_DATA_KEY, loginSuccessResponse.data);
      Emitter.emit(EMITTER_EVENTS.LOG_IN);
    },
  },
});

export const { twoFactorFormSubmit } = twoFactorAuthSlice.actions;

export default twoFactorAuthSlice.reducer;
