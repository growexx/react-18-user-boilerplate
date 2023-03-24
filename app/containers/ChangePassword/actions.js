/*
 *
 * ChangePassword actions
 *
 */

import {
  CHANGE_CONFIRM_NEW_PASSWORD,
  CHANGE_NEW_PASSWORD,
  CHANGE_CURRENT_PASSWORD,
  SUBMIT_DATA,
  LOADING,
} from './constants';

// eslint-disable-next-line consistent-return
export function updateField(name, value) {
  switch (name) {
    case 'currentPassword':
      return {
        type: CHANGE_CURRENT_PASSWORD,
        value,
      };
    case 'newPassword':
      return {
        type: CHANGE_NEW_PASSWORD,
        value,
      };
    case 'confirmNewPassword':
      return {
        type: CHANGE_CONFIRM_NEW_PASSWORD,
        value,
      };
    case 'loading':
      return {
        type: LOADING,
        value,
      };
    default:
  }
}

export function fireSubmit() {
  return {
    type: SUBMIT_DATA,
  };
}
