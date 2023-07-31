/*
 *
 * RealTimeChat actions
 *
 */

import { UPDATE_FIELD } from 'examples/RealTimeChat/constants';

export function updateField(key, payload) {
  return {
    type: UPDATE_FIELD,
    key,
    payload,
  };
}
