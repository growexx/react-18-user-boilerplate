/*
 *
 * ChangePassword constants
 *
 */
const PASSWORD_MUST_MATCH = 'Passwords do not match';
export const passwordsMustMatch = (value, allValues) =>
  value !== allValues.newPassword ? PASSWORD_MUST_MATCH : undefined;

export const CHANGE_CURRENT_PASSWORD =
  'boilerplate/ChangePassword/CHANGE_CURRENT_PASSWORD';
export const CHANGE_NEW_PASSWORD =
  'boilerplate/ChangePassword/CHANGE_NEW_PASSWORD';
export const CHANGE_CONFIRM_NEW_PASSWORD =
  'boilerplate/ChangePassword/CHANGE_CONFIRM_NEW_PASSWORD';
export const LOADING = 'boilerplate/ChangePassword/LOADING';
export const SUBMIT_DATA = 'boilerplate/ChangePassword/SUBMIT_DATA';
export const FORM_KEY = 'ChangePassword';
