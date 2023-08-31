import { apiSlice } from '../../apiSlice';

// use this if you are calling API for change password
export const changePasswordApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    changePassword: builder.mutation({
      query: credentials => ({
        url: `change-password`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useChangePasswordQuery } = changePasswordApi;
