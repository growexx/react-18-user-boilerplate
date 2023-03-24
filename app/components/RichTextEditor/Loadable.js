/**
 *
 * Asynchronously loads the component for RichTextEditor
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
