/**
 * Homepage selectors
 */

import { createSelector } from '@reduxjs/toolkit';

const selectReposQueries = state => state.repos.queries;

const makeSelectGetReposData = () =>
  createSelector(
    [selectReposQueries, (_, username) => username], // Pass username as a parameter
    (queries, username) => {
      const queryKey = `getRepos("${username}")`;
      return queries[queryKey]?.data || [];
    },
  );

export { makeSelectGetReposData };
