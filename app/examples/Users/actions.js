/*
 * Users actions
 */

import { UPDATE_FIELD } from './constants';

export function updateField(key, payload) {
  return {
    type: UPDATE_FIELD,
    key,
    payload,
  };
}
