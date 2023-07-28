import produce from 'immer';
import sampleFormReducer from '../reducer';

describe('sampleHookFormReducer', () => {
  it('returns the initial state by default', () => {
    const action = { type: 'unknown' };
    const initialState = produce(state => state);
    const expectedState = initialState;

    const newState = sampleFormReducer(undefined, action);
    expect({ ...expectedState }).toEqual({ ...newState });
  });
});
