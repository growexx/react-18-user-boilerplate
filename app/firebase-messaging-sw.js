/* eslint-disable no-undef */
/**
 * THIS IS FOR NOTIFICATION FIREBASE
 */
importScripts(
  'https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js',
);
importScripts('sw-env.js');

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const { notification, data } = payload;

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notification.title, {
    body: notification.body,
    icon: notification.icon,
    data,
  });
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('notificationclick', e => {
  // Close the notification popout
  e.notification.close();
  // Get all the Window clients
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientsArr => {
      // If a Window tab matching the targeted URL already exists, focus that;
      const hadWindowToFocus = clientsArr.some(windowClient =>
        windowClient.url === e.notification.data.url
          ? (windowClient.focus(), true)
          : false,
      );
      // Otherwise, open a new tab to the applicable URL and focus it.
      if (!hadWindowToFocus)
        clients
          .openWindow(e.notification.data.url)
          .then(windowClient => (windowClient ? windowClient.focus() : null));
    }),
  );
});
