import { UPDATE_FIELD } from '../constants';
import userReducer from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('userReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      // default state params here
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(userReducer(undefined, {})).toEqual(expectedResult);
  });
  it('returns the UPDATE_FIELD state', () => {
    const payload = {
      email: 'test@growexx.com',
    };
    expect(
      userReducer(
        {},
        { type: UPDATE_FIELD, payload: 'test@growexx.com', key: 'email' },
      ),
    ).toEqual(payload);
  });
});
