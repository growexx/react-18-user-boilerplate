import * as types from '../constants';
import reducer, { initialState } from '../reducer';
const getFormJsStateInstance = config =>
  Object.assign(
    {
      value: '',
    },
    config,
  );
describe('two factor authentication reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle CHANGE_VALUE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_VALUE,
        value: types.TEST_OTP_VALUE,
      }),
    ).toEqual(getFormJsStateInstance({ value: types.TEST_OTP_VALUE }));
  });
});
