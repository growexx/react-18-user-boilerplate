import { takeLatest } from '@redux-saga/core/effects';
import { SUBMIT_DATA } from './constants';

// eslint-disable-next-line no-unused-vars
export function* submitData(action) {
  // Note: Add API Call with action.payload
}

// Individual exports for testing
export default function* sampleFormSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SUBMIT_DATA, submitData);
}
