import { apiSlice } from '../../apiSlice';

export const repoApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getRepos: builder.query({
      query: username => ({
        url: `users/${username}/repos?type=all&sort=updated`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetReposQuery, useLazyGetReposQuery } = repoApi;
