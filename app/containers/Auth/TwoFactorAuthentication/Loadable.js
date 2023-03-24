/**
 *
 * Asynchronously loads the component for TwoFactorAuthentication
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
