/*
 *
 * HookForm actions
 *
 */

import { SUBMIT_DATA } from './constants';

export function submitData(body) {
  return {
    type: SUBMIT_DATA,
    payload: body,
  };
}
