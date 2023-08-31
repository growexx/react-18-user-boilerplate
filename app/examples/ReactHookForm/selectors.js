import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSampleFormDomain = state => state.sampleForm || initialState;

const makeSelectSampleForm = () =>
  createSelector(selectSampleFormDomain, substate => substate);

export default makeSelectSampleForm;
export { selectSampleFormDomain };
