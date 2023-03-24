/**
 *
 * Asynchronously loads the component for AuthContainer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
