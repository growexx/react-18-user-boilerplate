/**
 * Test sagas
 */
import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import configureStore from 'redux-mock-store';
import { SUBMIT_DATA } from '../constants';
import setSaga, { submitData as setSagaFunction } from '../saga';
const initialState = {};
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
describe('Testing sampleFormSaga', () => {
  test('sampleFormSaga', async () => {
    await recordSaga(setSagaFunction);
    const gen = setSaga();
    expect(gen.next().value).toEqual(takeLatest(SUBMIT_DATA, setSagaFunction));
  });
});
