import { createSelector } from 'reselect';
import { REDUCER_KEY } from './constants';
import { initialState } from './reducer';

/**
 * Direct selector to the RealTimeChat state domain
 */

const stateObject = state => state[REDUCER_KEY] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RealTimeChat
 */

const makeSelectRealTimeChat = () =>
  createSelector(
    stateObject,
    substate => substate,
  );

export default makeSelectRealTimeChat;
export { stateObject };
