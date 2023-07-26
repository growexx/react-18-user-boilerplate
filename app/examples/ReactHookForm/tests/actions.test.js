import { submitData } from '../actions';
import { SUBMIT_DATA } from '../constants';

describe('HookForm actions', () => {
  describe('Default Action', () => {
    it('has a type of SUBMIT_DATA', () => {
      const expected = {
        type: SUBMIT_DATA,
      };
      expect(submitData()).toEqual(expected);
    });
  });
});
