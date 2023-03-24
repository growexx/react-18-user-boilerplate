import { createSelector } from 'reselect';
import { FORM_KEY } from './constants';
import { initialState } from './reducer';

/**
 * Direct selector to the twoFactorAuthentication state domain
 */

const selectTwoFactorAuthenticationDomain = state =>
  state[FORM_KEY] || initialState;

const makeSelectValue = () =>
  createSelector(
    selectTwoFactorAuthenticationDomain,
    substate => substate.value,
  );

export { makeSelectValue, selectTwoFactorAuthenticationDomain };
