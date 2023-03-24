/**
 *
 * Asynchronously loads the component for ExportDataToCsv
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
