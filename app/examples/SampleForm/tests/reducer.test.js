// import produce from 'immer';
import { UPDATE_FIELD } from '../constants';
import sampleFormReducer from '../reducer';
// import { someAction } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('sampleFormReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      // default state params here
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(sampleFormReducer(undefined, {})).toEqual(expectedResult);
  });
  it('returns the UPDATE_FIELD state', () => {
    const payload = {
      test: 'test',
    };
    expect(
      sampleFormReducer(
        {},
        { type: UPDATE_FIELD, payload: 'test', key: 'test' },
      ),
    ).toEqual(payload);
  });
});
