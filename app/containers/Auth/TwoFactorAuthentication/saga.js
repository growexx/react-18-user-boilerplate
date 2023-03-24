/**
 * fires two factor authentication
 */

import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import Emitter from 'utils/events';
import { loginSuccessResponse } from 'containers/Auth/Login/stub/login.stub';
import { SUBMIT } from './constants';
import { ROUTES } from '../../constants';
import StorageService from '../../../utils/StorageService';
import {
  TOKEN_KEY,
  EMITTER_EVENTS,
  USER_DATA_KEY,
} from '../../../utils/constants';
import { changeValue } from './actions';

/**
 * user login request/response handler
 */
export function* getSignIn() {
  /**
   * Remove following code, It's only for demo purpose
   */
  StorageService.set(TOKEN_KEY, loginSuccessResponse.data.token);
  StorageService.set(USER_DATA_KEY, loginSuccessResponse.data);
  yield put(push(ROUTES.HOME));
  Emitter.emit(EMITTER_EVENTS.LOG_IN);
  yield put(changeValue(''));
  // ----------------Demo--------------------
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* twoFactorAuthentication() {
  // Watches for SUBMIT actions and calls getSignIn when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SUBMIT, getSignIn);
}
