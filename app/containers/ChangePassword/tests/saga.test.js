/* eslint-disable space-before-function-paren */
import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import configureStore from 'redux-mock-store';
import { FORM_KEY, SUBMIT_DATA } from '../constants';
import setSaga, { getPasswordChange as setSagaFunction } from '../saga';
jest.mock('utils/request');
const initialState = {
  [FORM_KEY]: {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    error: '',
    loading: false,
    success: '',
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
describe('Testing getPasswordChange', () => {
  test('getPasswordChange', async () => {
    await recordSaga(setSagaFunction);
    expect(recordSaga(setSagaFunction)).toBeTruthy();
  });
});
describe('Testing changePassword', () => {
  test('changePassword', () => {
    const gen = setSaga();
    expect(gen.next().value).toEqual(takeLatest(SUBMIT_DATA, setSagaFunction));
  });
});
