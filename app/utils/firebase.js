import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

// initializing firebase app
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
/**
 * auth constant for social login
 */
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

/**
 * Sign In With Google
 * @returns
 */
export const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then(res => {
      // eslint-disable-next-line no-console
      console.log(res.user);
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error.message);
    });
};

/**
 * Sign In With Facebook
 * @returns
 */
export const signInWithFacebook = () => {
  signInWithPopup(auth, facebookProvider)
    .then(res => {
      // eslint-disable-next-line no-console
      console.log(res.user);
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error.message);
    });
};
