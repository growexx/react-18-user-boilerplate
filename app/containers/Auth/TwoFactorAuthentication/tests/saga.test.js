/**
 * Test sagas
 */
import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import configureStore from 'redux-mock-store';
import { FORM_KEY, SUBMIT, TEST_OTP_VALUE } from '../constants';
import setSaga, { getSignIn as setSagaFunction } from '../saga';
jest.mock('utils/request');
const initialState = {
  [FORM_KEY]: {
    value: TEST_OTP_VALUE,
  },
};
const mockStore = configureStore();
const store = mockStore(initialState);
export async function recordSaga(saga) {
  const dispatched = [];

  await runSaga(
    {
      dispatch: action => dispatched.push(action),
      getState() {
        return store.getState();
      },
    },
    saga,
  ).done;

  return dispatched;
}
describe('Testing getSignIn', () => {
  test('getSignIn', async () => {
    await recordSaga(setSagaFunction);
    expect(recordSaga(setSagaFunction)).toBeTruthy();
  });
});
describe('Testing two factor authentication', () => {
  test('two factor authentication', () => {
    const gen = setSaga();
    expect(gen.next().value).toEqual(takeLatest(SUBMIT, setSagaFunction));
  });
});
