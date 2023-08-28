import { apiSlice } from '../../../apiSlice';

// use this if you are calling API for login
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `login`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginQuery } = authApi;
