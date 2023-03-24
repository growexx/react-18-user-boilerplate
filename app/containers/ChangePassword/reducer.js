/*
 *
 * ChangePassword reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_NEW_PASSWORD,
  CHANGE_CURRENT_PASSWORD,
  CHANGE_CONFIRM_NEW_PASSWORD,
  LOADING,
} from './constants';

export const initialState = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const changePasswordReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_CURRENT_PASSWORD:
        draft.currentPassword = action.value;
        draft.loading = false;
        break;
      case CHANGE_NEW_PASSWORD:
        draft.newPassword = action.value;
        draft.loading = false;
        break;
      case CHANGE_CONFIRM_NEW_PASSWORD:
        draft.confirmNewPassword = action.value;
        draft.loading = false;
        break;
      case LOADING:
        draft.loading = action.value;
        break;
    }
  });

export default changePasswordReducer;
