import { makeSelectGetReposData } from '../selectors';
import '@testing-library/jest-dom';

describe('selectRepo', () => {
  it('should select the global state', () => {
    const initialState = {
      repos: {
        queries: {},
      },
    };
    const reposData = makeSelectGetReposData()(initialState, '');
    expect(reposData).toStrictEqual([]);
  });
});
