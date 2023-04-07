/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
// import { connectRouter } from 'connected-react-router';
import { createReduxHistoryContext } from 'redux-first-history';
import { reducer as reduxFormReducer } from 'redux-form';
// import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
// import { createBrowserHistory } from 'history';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
// const {
//   createReduxHistory,
//   routerMiddleware,
//   routerReducer,
// } = createReduxHistoryContext({
//   history: createBrowserHistory(),
// });

export default function createReducer(routerReducer, injectedReducers = {}) {
  return combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    router: routerReducer,
    form: reduxFormReducer,
    ...injectedReducers,
  });
}
