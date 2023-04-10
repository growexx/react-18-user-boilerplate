/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(routerReducer, injectedReducers = {}) {
  return combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    router: routerReducer,
    form: reduxFormReducer,
    ...injectedReducers,
  });
}
