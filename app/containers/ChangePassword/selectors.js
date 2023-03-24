import { createSelector } from 'reselect';
import { FORM_KEY } from './constants';
import { initialState } from './reducer';

/**
 * Direct selector to the changePassword state domain
 */
const selectChangePasswordDomain = state => state[FORM_KEY] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ChangePassword
 */

const makeSelectCurrentPassword = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.currentPassword,
  );

const makeSelectNewPassword = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.newPassword,
  );

const makeSelectConfirmNewPassword = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.confirmNewPassword,
  );

const makeSelectLoading = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.loading,
  );

export {
  selectChangePasswordDomain,
  makeSelectCurrentPassword,
  makeSelectConfirmNewPassword,
  makeSelectNewPassword,
  makeSelectLoading,
};
