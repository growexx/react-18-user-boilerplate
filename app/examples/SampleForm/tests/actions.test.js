import { submitData, updateField } from '../actions';
import { SUBMIT_DATA, UPDATE_FIELD } from '../constants';

describe('SampleForm actions', () => {
  describe('Default Action', () => {
    it('has a type of UPDATE_FIELD', () => {
      const expected = {
        type: UPDATE_FIELD,
      };
      expect(updateField()).toEqual(expected);
    });
    it('has a type of SUBMIT_DATA', () => {
      const expected = {
        type: SUBMIT_DATA,
      };
      expect(submitData()).toEqual(expected);
    });
  });
});
