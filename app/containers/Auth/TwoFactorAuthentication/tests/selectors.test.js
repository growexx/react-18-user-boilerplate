import { FORM_KEY, TEST_OTP_VALUE } from '../constants';
import { initialState } from '../reducer';
import {
  makeSelectValue,
  selectTwoFactorAuthenticationDomain,
} from '../selectors';

describe('Two Factor Authentication Selectors Testing', () => {
  it('Testing selectTwoFactorAuthenticationDomain', () => {
    const mockState = {
      [FORM_KEY]: {
        value: TEST_OTP_VALUE,
      },
    };
    expect(selectTwoFactorAuthenticationDomain(mockState)).toEqual({
      value: TEST_OTP_VALUE,
    });
  });
  it('Testing selectTwoFactorAuthenticationDomain with initialState', () => {
    const mockState = {};
    expect(selectTwoFactorAuthenticationDomain(mockState)).toEqual(
      initialState,
    );
  });
  it('Testing makeSelectValue', () => {
    const mockState = {
      [FORM_KEY]: {
        value: TEST_OTP_VALUE,
      },
    };
    const result = { value: TEST_OTP_VALUE };
    const sel = makeSelectValue(mockState);
    const actual = sel.resultFunc(result);
    const expected = TEST_OTP_VALUE;
    expect(actual).toEqual(expected);
  });
});
