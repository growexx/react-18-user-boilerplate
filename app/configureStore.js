import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

import { repoApi } from './containers/HomePage/reposApiSlice';
import { appSlice } from './containers/App/slice';
import { apiSlice } from './apiSlice';
import languageSlice from './containers/LanguageProvider/slice';
import loginSlice from './containers/Auth/Login/slice';
import { authApi } from './containers/Auth/Login/authApiSlice';
import twoFactorAuthSlice from './containers/Auth/TwoFactorAuthentication/slice';

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

const store = configureStore({
  reducer: {
    router: routerReducer,
    app: appSlice,
    language: languageSlice,
    login: loginSlice,
    twoFactorAuth: twoFactorAuthSlice,
    repos: repoApi.reducer,
    auth: authApi.reducer,
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
