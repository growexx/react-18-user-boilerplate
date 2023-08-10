/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

const { routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  return combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    router: routerReducer,
    form: reduxFormReducer,
    ...injectedReducers,
  });
}
