import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sampleForm state domain
 */

const selectSampleFormDomain = state => state.sampleForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SampleForm
 */

const makeSelectSampleForm = () =>
  createSelector(
    selectSampleFormDomain,
    substate => substate,
  );

export default makeSelectSampleForm;
export { selectSampleFormDomain };
