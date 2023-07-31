/**
 * fires two factor authentication
 */

import { put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'redux-first-history';
import Emitter from 'utils/events';
import { loginSuccessResponse } from 'containers/Auth/Login/stub/login.stub';
import { makeSelectEmail } from 'containers/Auth/Login/selectors';
import { SUBMIT } from './constants';
import { FIRESTORE_COLLECTIONS, ROUTES } from '../../constants';
import StorageService from '../../../utils/StorageService';
import {
  TOKEN_KEY,
  EMITTER_EVENTS,
  USER_DATA_KEY,
} from '../../../utils/constants';
import { changeValue } from './actions';
import {
  getFireStoreCollectionReference,
  addFirestoreDocumentData,
  getFireStoreDocumentReference,
} from '../../../utils/firebase';

/**
 * verifyUserInFireStore
 * @param {string} emailId
 */
const verifyUserInFireStore = async emailId => {
  // see if data exits
  getFireStoreCollectionReference(FIRESTORE_COLLECTIONS.PROFILE)
    .where(`email`, '==', emailId)
    .get()
    .then(async querySnapshot => {
      const { docs } = querySnapshot;
      if (docs.length > 0) {
        const docRef = await getFireStoreDocumentReference(
          FIRESTORE_COLLECTIONS.PROFILE,
          docs[0].id,
        );
        const updatePayload = {
          lastSeen: new Date(),
        };
        docRef.update(updatePayload);
      } else {
        const payload = {
          email: emailId,
          lastSeen: new Date(),
          userName: emailId.split('@').shift(),
        };
        // set the data
        await addFirestoreDocumentData(FIRESTORE_COLLECTIONS.PROFILE, payload)
          .then(() => {
            // eslint-disable-next-line no-console
            console.log('Document successfully written!');
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.error('Error writing document: ', error);
          });
      }
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log('Error getting document:', error);
    });
};

/**
 * user login request/response handler
 */
export function* getSignIn() {
  const emailId = yield select(makeSelectEmail());
  /**
   * Remove following code, It's only for demo purpose
   */
  StorageService.set(TOKEN_KEY, loginSuccessResponse.data.token);
  StorageService.set(USER_DATA_KEY, {
    ...loginSuccessResponse.data,
    email: emailId,
  });
  yield put(push(ROUTES.HOME));
  Emitter.emit(EMITTER_EVENTS.LOG_IN);
  yield put(changeValue(''));
  // ----------------Demo--------------------
  // check value in database, if no data found then to add to firestore
  verifyUserInFireStore(emailId);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* twoFactorAuthentication() {
  // Watches for SUBMIT actions and calls getSignIn when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SUBMIT, getSignIn);
}
