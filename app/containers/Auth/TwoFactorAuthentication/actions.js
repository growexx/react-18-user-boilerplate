/*
 *
 * TwoFactorAuthentication actions
 *
 */

import { CHANGE_VALUE, SUBMIT } from './constants';

export function changeValue(value) {
  return {
    type: CHANGE_VALUE,
    value,
  };
}

export function fireSubmit() {
  return {
    type: SUBMIT,
  };
}
