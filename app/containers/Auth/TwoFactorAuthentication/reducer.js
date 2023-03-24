/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/*
 *
 * TwoFactorAuthentication reducer
 *
 */
import produce from 'immer';
import { CHANGE_VALUE } from './constants';

// The initial state of the App
export const initialState = {
  value: '',
};

/* eslint-disable default-case, no-param-reassign */
const twoFactorAuthenticationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_VALUE:
        draft.value = action.value;
        break;
      default:
        return state;
    }
  });

export default twoFactorAuthenticationReducer;
