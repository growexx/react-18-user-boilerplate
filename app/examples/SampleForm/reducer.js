/*
 *
 * SampleForm reducer
 *
 */
import produce from 'immer';
import { UPDATE_FIELD } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const sampleFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_FIELD:
        draft[action.key] = action.payload;
        break;
    }
  });

export default sampleFormReducer;
