/**
 *
 * Asynchronously loads the component for FontAwesomeDemo
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
