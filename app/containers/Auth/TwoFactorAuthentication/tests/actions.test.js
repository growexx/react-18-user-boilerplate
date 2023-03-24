import { changeValue, fireSubmit } from '../actions';
import { TEST_OTP_VALUE, CHANGE_VALUE, SUBMIT } from '../constants';

describe('TwoFactorAuthentication actions', () => {
  describe('changeValue Action', () => {
    it('has a type of CHANGE_VALUE', () => {
      const expected = {
        type: CHANGE_VALUE,
        value: TEST_OTP_VALUE,
      };
      expect(changeValue(TEST_OTP_VALUE)).toEqual(expected);
    });
    it('has a type of SUBMIT', () => {
      const expected = {
        type: SUBMIT,
      };
      expect(fireSubmit()).toEqual(expected);
    });
  });
});
