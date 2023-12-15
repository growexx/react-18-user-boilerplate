/**
 *
 * Asynchronously loads the component for Ag Grid
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
