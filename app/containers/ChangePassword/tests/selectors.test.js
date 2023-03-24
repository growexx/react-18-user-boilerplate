import {
  makeSelectCurrentPassword,
  makeSelectNewPassword,
  makeSelectConfirmNewPassword,
  makeSelectLoading,
  selectChangePasswordDomain,
} from '../selectors';
import { FORM_KEY } from '../constants';
import { initialState } from '../reducer';

describe('Selectors Testing', () => {
  it('Testing makeSelectCurrentPassword', () => {
    const mockState = {
      [FORM_KEY]: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        error: '',
        loading: false,
        success: '',
      },
    };
    const result = {
      currentPassword: 'test value',
      newPassword: '',
      confirmNewPassword: '',
      error: 'test value',
      loading: false,
      success: '',
    };
    const sel = makeSelectCurrentPassword(mockState);
    const actual = sel.resultFunc(result);
    const expected = 'test value';
    expect(actual).toEqual(expected);
  });
  it('Testing selectChangePasswordDomain ', () => {
    const mockState = {
      [FORM_KEY]: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        error: '',
        loading: false,
        success: '',
      },
    };
    const initialMockState = {};
    expect(selectChangePasswordDomain(mockState)).toEqual(mockState[FORM_KEY]);
    // with initial state
    expect(selectChangePasswordDomain(initialMockState)).toEqual(initialState);
  });
  it('Testing makeSelectNewPassword', () => {
    const mockState = {
      [FORM_KEY]: {
        currentPassword: '',
        newPassword: 'test value',
        confirmNewPassword: '',
        error: '',
        loading: false,
        success: '',
      },
    };
    const result = {
      currentPassword: '',
      newPassword: 'test value',
      confirmNewPassword: '',
      error: '',
      loading: false,
      success: '',
    };
    const sel = makeSelectNewPassword(mockState);
    const actual = sel.resultFunc(result);
    const expected = 'test value';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectConfirmNewPassword', () => {
    const mockState = {
      [FORM_KEY]: {
        currentPassword: '',
        newPassword: 'test value',
        confirmNewPassword: '',
        error: '',
        loading: false,
        success: '',
      },
    };
    const result = {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: 'test value',
      error: '',
      loading: false,
      success: '',
    };
    const sel = makeSelectConfirmNewPassword(mockState);
    const actual = sel.resultFunc(result);
    const expected = 'test value';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectLoading', () => {
    const mockState = {
      [FORM_KEY]: {
        currentPassword: '',
        newPassword: 'test value',
        confirmNewPassword: '',
        error: '',
        loading: false,
        success: '',
      },
    };
    const result = {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      error: '',
      loading: 'test value',
      success: '',
    };
    const sel = makeSelectLoading(mockState);
    const actual = sel.resultFunc(result);
    const expected = 'test value';
    expect(actual).toEqual(expected);
  });
});
