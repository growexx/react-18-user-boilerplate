import { selectLanguage } from '../selectors';
import { initialState } from '../slice';

describe('selectLanguage', () => {
  it('should select the global state', () => {
    const globalState = {};
    let mockedState = {
      language: globalState,
    };
    expect(selectLanguage(mockedState)).toEqual(globalState);
    mockedState = {};
    expect(selectLanguage(mockedState)).toEqual(initialState);
  });
});
