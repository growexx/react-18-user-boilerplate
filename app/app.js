/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'core-js/stable';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import FontFaceObserver from 'fontfaceobserver';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
// Font Awesome Initialization
// Remove which is not needed
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import 'sanitize.css/sanitize.css';

// Import root app
import MainLayout from 'components/MainLayout';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicons/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import { store, history } from './configureStore';
import { themeConfig } from './utils/constants';

// Import i18n messages
import { translationMessages } from './i18n';
// Make font awesome library to be used across project
library.add(fab, far, fas);

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const MOUNT_NODE = ReactDOM.createRoot(document.getElementById('app'));
const renderMessage = message =>
  MOUNT_NODE.render(
    <Provider store={store}>
      <LanguageProvider messages={message}>
        <Router history={history}>
          <ConfigProvider theme={themeConfig}>
            <MainLayout />
          </ConfigProvider>
        </Router>
      </LanguageProvider>
    </Provider>,
  );

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    // ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    MOUNT_NODE.unmount();
    renderMessage(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('@formatjs/intl-pluralrules/polyfill'),
        import('@formatjs/intl-pluralrules/locale-data/en'),
        import('@formatjs/intl-pluralrules/locale-data/de'),
      ]),
    ) // eslint-disable-line prettier/prettier
    .then(() => renderMessage(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  renderMessage(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
// if (process.env.NODE_ENV === 'production') {
//   require('offline-plugin/runtime').install(); // eslint-disable-line global-require
// }
