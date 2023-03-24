import { updateField } from '../actions';
import { UPDATE_FIELD } from '../constants';

describe('Users actions', () => {
  describe('Default Action', () => {
    it('has a type of UPDATE_FIELD', () => {
      const expected = {
        type: UPDATE_FIELD,
      };
      expect(updateField()).toEqual(expected);
    });
  });
});
