/**
 *
 * Asynchronously loads the component for RealTimeChat
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
