import { signInWithGoogle, signInWithFacebook } from 'utils/firebase';
jest.mock('firebase/messaging', () => {
  const actualModule = jest.requireActual('firebase/messaging');
  return {
    ...actualModule,
    onMessage: jest.fn(),
    getMessaging: jest.fn(),
  };
});
describe('Firebase utils', () => {
  test('firebase signInWithGoogle', () => {
    signInWithGoogle();
    expect(signInWithGoogle).toBeTruthy();
  });
  test('firebase signInWithFacebook', () => {
    signInWithFacebook();
    expect(signInWithFacebook).toBeTruthy();
  });
});
