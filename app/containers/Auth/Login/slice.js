import { createSlice } from '@reduxjs/toolkit';
import { signInWithGoogle, signInWithFacebook } from 'utils/firebase';
import Emitter from 'utils/events';
import StorageService from '../../../utils/StorageService';
import { loginSuccessResponse } from './stub/login.stub';
import {
  EMITTER_EVENTS,
  TOKEN_KEY,
  USER_DATA_KEY,
} from '../../../utils/constants';

const initialState = {
  email: '',
  password: '',
  loading: false,
  error: false,
  success: false,
};

const loginSlice = createSlice({
  initialState,
  name: 'login',
  reducers: {
    login: () => {
      StorageService.set(TOKEN_KEY, loginSuccessResponse.data.token);
      StorageService.set(USER_DATA_KEY, loginSuccessResponse.data);
      Emitter.emit(EMITTER_EVENTS.LOG_IN);
    },
    googleLogin: () => {
      signInWithGoogle();
    },
    facebookLogin: () => {
      signInWithFacebook();
    },
  },
});

export const {
  changeEmail,
  changePassword,
  changeLoading,
  logInSuccess,
  logInError,
  resetState,
  login,
  googleLogin,
  facebookLogin,
} = loginSlice.actions;

export default loginSlice.reducer;
