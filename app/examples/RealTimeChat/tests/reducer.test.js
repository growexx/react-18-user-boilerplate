import { UPDATE_FIELD } from 'examples/RealTimeChat/constants';
import RealTimeChatReducer, {
  initialState,
} from 'examples/RealTimeChat/reducer';

describe('RealTimeChatReducer', () => {
  it('returns the initial state', () => {
    const expectedResult = initialState;
    expect(RealTimeChatReducer(undefined, {})).toEqual(expectedResult);
  });
  it('returns the UPDATE_FIELD state', () => {
    const payload = {
      test: 'test',
    };
    expect(
      RealTimeChatReducer(
        {},
        { type: UPDATE_FIELD, payload: 'test', key: 'test' },
      ),
    ).toEqual(payload);
  });
});
