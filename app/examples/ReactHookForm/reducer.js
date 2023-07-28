/*
 *
 * SampleHookForm reducer
 *
 */
import produce from 'immer';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign, no-unused-vars, no-shadow */
const sampleFormReducer = (state = initialState, action) =>
  produce(state => {
    switch (action.type) {
      default:
        return state;
    }
  });

export default sampleFormReducer;
