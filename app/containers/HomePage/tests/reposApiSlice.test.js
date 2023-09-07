import { renderHook, waitFor } from '@testing-library/react';
import { useLazyGetReposQuery } from '../reposApiSlice';

jest.mock('../reposApiSlice', () => ({
  useLazyGetReposQuery: jest.fn(),
}));

describe('reposApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a successful repo api request', async () => {
    const mockData = { repose: [] };

    useLazyGetReposQuery.mockReturnValueOnce({
      isLoading: false,
      isError: false,
      isSuccess: true,
      data: mockData,
    });

    const { result } = renderHook(() => useLazyGetReposQuery('testUsername'));
    await waitFor(() => result.current.isSuccess);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toEqual(mockData);
  });
});
