import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import languageSlice from './containers/LanguageProvider/slice';

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

const store = configureStore({
  reducer: combineReducers({
    router: routerReducer,
    language: languageSlice,
  }),
  middleware: [routerMiddleware],
});

const history = createReduxHistory(store);

export { store, history };
