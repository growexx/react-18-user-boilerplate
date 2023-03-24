/**
 * Logs the user in the app
 */
import { select, put, takeLatest } from 'redux-saga/effects';
// import request from 'utils/request';
import { SUBMIT_DATA } from './constants';
// import { API_ENDPOINTS } from '../constants';
import {
  makeSelectConfirmNewPassword,
  makeSelectCurrentPassword,
  makeSelectNewPassword,
} from './selectors';
import { updateField } from './actions';
import { showNotification } from './helper';

/**
 * user login request/response handler
 */
export function* getPasswordChange() {
  const currentPassword = yield select(makeSelectCurrentPassword());
  yield put(updateField('loading', false));
  const newPassword = yield select(makeSelectNewPassword());
  const confirmNewPassword = yield select(makeSelectConfirmNewPassword());
  console.log(currentPassword, newPassword, confirmNewPassword);
  // eslint-disable-next-line no-console
  showNotification('Change Password Error', 'error');
  showNotification('Change Password Success', 'success');
  /**
   * NOTE: API CODE
   */
  // const payload = {
  //   currentPassword,
  //   newPassword,
  //   confirmNewPassword,
  // };
  // const data = {
  //   method: 'POST',
  //   body: payload,
  // };
  // try {
  //   const log = yield call(request, API_ENDPOINTS.LOGIN, data);
  //   yield put(updateField('loading', true));
  //   if (log.status === 1) {
  //     yield put(updateField('success', log.message));
  //     yield put(updateField('loading', false));
  //   } else {
  //     yield put(updateField('loading', false));
  //     yield put(updateField('error', log.message));
  //   }
  // } catch (err) {
  //   yield put(updateField('loading', false));
  //   yield put(updateField('error', err.message));
  // }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* changePassword() {
  // Watches for LOGIN actions and calls getSignIn when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SUBMIT_DATA, getPasswordChange);
}
