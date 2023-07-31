import {
  getFireStoreCollectionReference,
  addFirestoreDocumentData,
  getFireStoreDocumentReference,
  getDataFromReference,
  getFireStoreDocumentData,
  setFirestoreDocumentData,
} from 'utils/firebase';
const stubData = {
  collectionName: 'testCollection',
  documentName: 'testDocument',
  get: jest.fn(),
  payload: {},
  options: {},
  documentData: {},
};
describe('Firebase utils', () => {
  test('firebase getFireStoreCollectionReference', () => {
    getFireStoreCollectionReference(stubData.collectionName);
    expect(getFireStoreCollectionReference).toBeTruthy();
  });
  test('firebase addFirestoreDocumentData', () => {
    addFirestoreDocumentData(stubData.collectionName, stubData.documentData);
    expect(addFirestoreDocumentData).toBeTruthy();
  });
  test('firebase getFireStoreDocumentReference', () => {
    getFireStoreDocumentReference(
      stubData.collectionName,
      stubData.documentName,
    );
    expect(getFireStoreDocumentReference).toBeTruthy();
  });
  test('firebase getDataFromReference', () => {
    getDataFromReference(stubData);
    expect(getDataFromReference).toBeTruthy();
  });
  test('firebase getFireStoreDocumentData', () => {
    getFireStoreDocumentData(stubData.collectionName, stubData.documentName);
    expect(getFireStoreDocumentData).toBeTruthy();
  });
  test('firebase setFirestoreDocumentData', () => {
    setFirestoreDocumentData(
      stubData.collectionName,
      stubData.documentName,
      stubData.payload,
      stubData.options,
    );
    expect(setFirestoreDocumentData).toBeTruthy();
  });
});
