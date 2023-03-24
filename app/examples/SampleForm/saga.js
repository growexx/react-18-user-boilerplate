// import { take, call, put, select } from 'redux-saga/effects';

import { select, takeLatest } from '@redux-saga/core/effects';
import makeSelectSampleForm from './selectors';
import { SUBMIT_DATA } from './constants';

export function* submitData() {
  yield select(makeSelectSampleForm());
  // Note: Add API Call
}

// Individual exports for testing
export default function* sampleFormSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SUBMIT_DATA, submitData);
}
