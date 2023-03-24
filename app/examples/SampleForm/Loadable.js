/**
 *
 * Asynchronously loads the component for SampleForm
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
