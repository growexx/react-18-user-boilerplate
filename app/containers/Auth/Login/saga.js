/**
 * Logs the user in the app
 */

import { /* call, select */ put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
/* import sha256 from 'sha256'; 
import Emitter from 'utils/events';
import request from 'utils/request';
import {
  makeSelectEmail,
  makeSelectPassword,
} from 'containers/Auth/Login/selectors';
import {
  loginInError, changeLoading,
  logInSuccess,
  resetState,
} from './actions';
import { API_ENDPOINTS } from '../constants';
import {
  TOKEN_KEY,
  EMITTER_EVENTS,
  USER_DATA_KEY,
} from '../../../utils/constants';
import StorageService from '../../../utils/StorageService';
*/

import { LOGIN } from './constants';
import { ROUTES } from '../../constants';

/**
 * user login request/response handler
 */
export function* getSignIn() {
  yield put(push(ROUTES.TWO_FACTOR_AUTHENTICATION));

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
 * Root saga manages watcher lifecycle
 */
export default function* login() {
  // Watches for LOGIN actions and calls getSignIn when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOGIN, getSignIn);
}
