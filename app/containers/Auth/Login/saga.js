/* eslint-disable no-empty-function */
/**
 * Logs the user in the app
 */

import { /* call, select */ put, takeLatest } from 'redux-saga/effects';
import { push } from 'redux-first-history';
/* import sha256 from 'sha256'; 
import Emitter from 'utils/events';
import request from 'utils/request';
import {
  makeSelectEmail,
  makeSelectPassword,
} from 'containers/Auth/Login/selectors';
import { API_ENDPOINTS } from '../constants';
*/
import Emitter from 'utils/events';
import { signInWithGoogle, signInWithFacebook, auth } from 'utils/firebase';
import { ROUTES } from '../../constants';
import { changeLoading, logInSuccess, resetState } from './actions';
import { LOGIN, GOOGLE_LOGIN, FACEBOOK_LOGIN } from './constants';
import StorageService from '../../../utils/StorageService';
import {
  TOKEN_KEY,
  EMITTER_EVENTS,
  USER_DATA_KEY,
} from '../../../utils/constants';
import { loginSuccessResponse } from './stub/login.stub';

/**
 * user login request/response handler
 */
export function* getSignIn() {
  /**
   * Remove following code, It's only for demo purpose
   */
  yield put(logInSuccess(loginSuccessResponse.message));
  StorageService.set(TOKEN_KEY, loginSuccessResponse.data.token);
  StorageService.set(USER_DATA_KEY, loginSuccessResponse.data);
  yield put(changeLoading(false));
  yield put(resetState());
  yield put(push(ROUTES.HOME));
  Emitter.emit(EMITTER_EVENTS.LOG_IN);
  // ----------------Demo--------------------

  /** if two factor is configured */
  // yield put(push(ROUTES.TWO_FACTOR_AUTHENTICATION));
  /** if two factor is configured */
  /**
   * LOGIN API INTEGRATION CODE
  const emailId = yield select(makeSelectEmail());
  const passWord = yield select(makeSelectPassword());
  const payload = {
    email: emailId,
    password: sha256(passWord),
  };
  const data = {
    method: 'POST',
    body: payload,
  };
  try {
    const log = yield call(request, API_ENDPOINTS.LOGIN, data);
    yield put(changeLoading(true));
    if (log.status === 1) {
      yield put(logInSuccess(log.message));
      StorageService.set(TOKEN_KEY, log.data.token);
      StorageService.set(USER_DATA_KEY, log.data);
      yield put(changeLoading(false));
      yield put(resetState());
      yield put(push(ROUTES.TWO_FACTOR_AUTHENTICATION));
      Emitter.emit(EMITTER_EVENTS.LOG_IN);
    } else {
      yield put(resetState());
      yield put(changeLoading(false));
      yield put(logInError(true));
    }
  } catch (err) {
    yield put(resetState());
    yield put(changeLoading(false));
    yield put(logInError(true));
  }
  */
}

/**
 * user login request/response handler with google
 */
export function getGoogleSignIn() {
  /**
   * Remove following code, It's only for demo purpose
   */
  // yield put(logInSuccess(loginSuccessResponse.message));
  // StorageService.set(TOKEN_KEY, loginSuccessResponse.data.token);
  // StorageService.set(USER_DATA_KEY, loginSuccessResponse.data);
  // yield put(changeLoading(false));
  // yield put(resetState());
  // yield put(push(ROUTES.HOME));
  // Emitter.emit(EMITTER_EVENTS.LOG_IN);
  // ----------------Demo--------------------  });

  signInWithGoogle();
  //  *SUCCESS AND FAILURE CHANGES IN FOLLOWING FUNCTION
  // eslint-disable-next-line func-names
  auth.onAuthStateChanged(function* () {});
}
/**
 * user login request/response handler with facebook
 */
export function getFacebookSignIn() {
  /**
   * Remove following code, It's only for demo purpose
   */
  // yield put(logInSuccess(loginSuccessResponse.message));
  // StorageService.set(TOKEN_KEY, loginSuccessResponse.data.token);
  // StorageService.set(USER_DATA_KEY, loginSuccessResponse.data);
  // yield put(changeLoading(false));
  // yield put(resetState());
  // yield put(push(ROUTES.HOME));
  // Emitter.emit(EMITTER_EVENTS.LOG_IN);
  // ----------------Demo--------------------  });
  signInWithFacebook();
  // SUCCESS AND FAILURE CHANGES IN FOLLOWING FUNCTION
  // eslint-disable-next-line func-names
  auth.onAuthStateChanged(function* () {});
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* login() {
  // Watches for LOGIN actions and calls getSignIn when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOGIN, getSignIn);
  yield takeLatest(GOOGLE_LOGIN, getGoogleSignIn);
  yield takeLatest(FACEBOOK_LOGIN, getFacebookSignIn);
}
