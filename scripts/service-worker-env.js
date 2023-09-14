const path = require('path');
require('dotenv').config();

const serviceWorkerEnvKeys = [
  'REACT_APP_GA_TAG_ID',
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN',
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_APP_ID',
  'REACT_APP_FIREBASE_VAPID_KEY',
];

const createServiceWorkerEnv = (fs, cb) => {
  // fs here is passed from webpack
  const serviceWorkerEnv = {};
  serviceWorkerEnvKeys.forEach(key => {
    serviceWorkerEnv[key] = process.env[key];
  });
  console.log('Creating Service Worker ENV!');

  const buildPath = path.join(process.cwd(), '/build/sw-env.js');
  fs.writeFile(
    buildPath,
    `
	const process = {
		env: ${JSON.stringify(serviceWorkerEnv, null, 2)}
	}
	`,
    function(err, data) {
      if (typeof cb === 'function') {
        cb(err, data);
      }
    },
  );
};

module.exports = {
  createServiceWorkerEnv,
};
