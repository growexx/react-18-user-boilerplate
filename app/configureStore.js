import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

import { repoApi } from './containers/HomePage/reposApiSlice';
import { appSlice } from './containers/App/slice';
import languageSlice from './containers/LanguageProvider/slice';
import { apiSlice } from './apiSlice';

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

const store = configureStore({
  reducer: {
    router: routerReducer,
    app: appSlice,
    language: languageSlice,
    repos: repoApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    apiSlice.middleware,
    routerMiddleware,
  ],
  devTools: process.env.NODE_ENV !== 'production',
});

const history = createReduxHistory(store);

export { store, history };
