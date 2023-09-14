import { renderHook, waitFor } from '@testing-library/react';
import { useLoginMutation } from '../authApiSlice'; // Replace with the actual path

jest.mock('../authApiSlice', () => ({
  useLoginMutation: jest.fn(),
}));

describe('authApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a successful login request', async () => {
    const mockData = { user: { id: 1, username: 'testuser' } };
    const credentials = { username: 'testuser', password: 'password' };

    useLoginMutation.mockReturnValueOnce({
      isLoading: false,
      isError: false,
      isSuccess: true,
      data: mockData,
    });

    const { result } = renderHook(() => useLoginMutation(credentials));
    await waitFor(() => result.current.isSuccess);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toEqual(mockData);
  });

  it('should handle a failed login request', async () => {
    const credentials = { username: 'testuser', password: 'password' };
    const errorResponse = { message: 'Authentication failed' };
    useLoginMutation.mockReturnValueOnce({
      isLoading: false,
      isError: true,
      isSuccess: false,
      error: errorResponse,
    });

    const { result } = renderHook(() => useLoginMutation(credentials));
    await waitFor(() => result.current.isError);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toEqual(errorResponse);
  });
});
