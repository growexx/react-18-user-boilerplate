import { updateField } from '../actions';
import { UPDATE_FIELD } from '../constants';

describe('RealTimeChat actions', () => {
  it('has a type of UPDATE_FIELD', () => {
    const key = 'testField';
    const payload = 'testValue';
    const expected = {
      type: UPDATE_FIELD,
      key,
      payload,
    };
    expect(updateField(key, payload)).toEqual(expected);
  });
});
