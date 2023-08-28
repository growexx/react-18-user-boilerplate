import { createSlice } from '@reduxjs/toolkit';
import { push } from 'redux-first-history';
import StorageService from '../../../utils/StorageService';
import { loginSuccessResponse } from './stub/login.stub';
import {
  EMITTER_EVENTS,
  TOKEN_KEY,
  USER_DATA_KEY,
} from '../../../utils/constants';
import { signInWithGoogle, signInWithFacebook, auth } from 'utils/firebase';
import { ROUTES } from '../../constants';
import Emitter from 'utils/events';

const initialState = {
  email: '',
  password: '',
  loading: false,
  error: false,
  success: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeLoading: (state, action) => {
      state.loading = action.payload;
      state.error = false;
      state.success = false;
    },
    logInSuccess: (state, action) => {
      state.success = action.payload;
      state.loading = false;
      state.error = false;
    },
    logInError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
    resetState: (state) => {
      state.email = '';
      state.password = '';
      state.loading = false;
      state.error = false;
      state.success = false;
    },
    login: (state, action) => {
      StorageService.set(TOKEN_KEY, loginSuccessResponse.data.token);
      StorageService.set(USER_DATA_KEY, loginSuccessResponse.data);
      push(ROUTES.HOME);
      Emitter.emit(EMITTER_EVENTS.LOG_IN);
    },
    googleLogin: (state, action) => {
      signInWithGoogle();
      // SUCCESS AND FAILURE CHANGES IN FOLLOWING FUNCTION
      auth.onAuthStateChanged(function* () {});
    },
    facebookLogin: (state, action) => {
      signInWithFacebook();
      // SUCCESS AND FAILURE CHANGES IN FOLLOWING FUNCTION
      auth.onAuthStateChanged(function* () {});
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
