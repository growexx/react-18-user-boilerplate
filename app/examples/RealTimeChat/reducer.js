/*
 *
 * RealTimeChat reducer
 *
 */
import produce from 'immer';
import { UPDATE_FIELD } from './constants';

export const initialState = {
  currentUserRef: '',
  receiverUserRefs: [],
  receiverUserValues: [],
  currentUserValue: {},
  searchResults: [],
  loading: false,
  selectedChatWindow: '',
  chatWindowId: '',
  chatList: [],
};

/* eslint-disable default-case, no-param-reassign */
const RealTimeChatReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_FIELD:
        draft[action.key] = action.payload;
        break;
    }
  });

export default RealTimeChatReducer;
