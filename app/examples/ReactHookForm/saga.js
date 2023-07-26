import { takeLatest } from '@redux-saga/core/effects';
// import makeSelectSampleForm from './selectors';
import { SUBMIT_DATA } from './constants';

export function* submitData(action) {
  // eslint-disable-next-line no-console
  console.log('submitData body :: ', action.payload);
  // Note: Add API Call
}

// Individual exports for testing
export default function* sampleFormSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SUBMIT_DATA, submitData);
}
