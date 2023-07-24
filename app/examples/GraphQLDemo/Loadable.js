/**
 *
 * Asynchronously loads the component for GraphQLDemo
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
