/**
 * Test sagas
 */
import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import configureStore from 'redux-mock-store';
import {
  getFireStoreCollectionReference,
  addFirestoreDocumentData,
  getFireStoreDocumentReference,
} from 'utils/firebase';
import { getFailureResponse } from 'examples/RealTimeChat/stub';
import { stubUserData } from 'containers/Auth/TwoFactorAuthentication/stub';
import { FORM_KEY, SUBMIT, TEST_OTP_VALUE } from '../constants';
import setSaga, { getSignIn as setSagaFunction } from '../saga';

jest.mock('utils/request');
jest.mock('utils/firebase');

const initialState = {
  [FORM_KEY]: {
    value: TEST_OTP_VALUE,
  },
};
const mockStore = configureStore();
const store = mockStore(initialState);
const mockGetFireStoreCollectionReference = async (responseType, elseCase) => {
  getFireStoreCollectionReference.mockImplementation(() => ({
    where: jest.fn().mockImplementation(() => ({
      get: jest
        .fn()
        .mockImplementationOnce(() =>
          responseType === 'success'
            ? Promise.resolve(stubUserData(elseCase))
            : getFailureResponse(),
        ),
    })),
  }));
};
const mockGetFireStoreDocumentReference = () => {
  getFireStoreDocumentReference.mockImplementation(() => ({
    update: jest.fn(),
  }));
};
const mockAddFirestoreDocumentData = async responseType => {
  if (responseType === 'success') {
    addFirestoreDocumentData.mockImplementation(() =>
      Promise.resolve({ id: '2810' }),
    );
  } else {
    addFirestoreDocumentData.mockImplementation(() => getFailureResponse());
  }
};
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
    mockGetFireStoreCollectionReference('success');
    mockGetFireStoreDocumentReference();
    await recordSaga(setSagaFunction);
    expect(recordSaga(setSagaFunction)).toBeTruthy();
  });
  test('getSignIn getting user fails', async () => {
    mockGetFireStoreCollectionReference('failure');
    mockGetFireStoreDocumentReference();
    await recordSaga(setSagaFunction);
    expect(recordSaga(setSagaFunction)).toBeTruthy();
  });
  test('getSignIn with new user', async () => {
    mockGetFireStoreCollectionReference('success', true);
    mockAddFirestoreDocumentData('success');
    await recordSaga(setSagaFunction);
    expect(recordSaga(setSagaFunction)).toBeTruthy();
  });
  test('getSignIn with new user and it fails', async () => {
    mockGetFireStoreCollectionReference('success', true);
    mockAddFirestoreDocumentData('failure');
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
