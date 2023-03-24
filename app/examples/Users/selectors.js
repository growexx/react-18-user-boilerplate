import { createSelector } from 'reselect';
import { USERS_KEY } from './constants';

/**
 * Direct selector to the user
 */

const selectUser = state => state && state[USERS_KEY];

/**
 * Default selector used by user
 */

const makeSelectUser = () =>
  createSelector(
    selectUser,
    subState => subState,
  );

export default makeSelectUser;
export { makeSelectUser };
