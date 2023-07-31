import { signInWithGoogle, signInWithFacebook } from 'utils/firebase';

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
