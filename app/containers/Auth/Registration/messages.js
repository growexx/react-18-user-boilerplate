/*
 * Registration Messages
 *
 * This contains all the text for the Registration container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Registration';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Registration container!',
  },
  createAccount: {
    id: `${scope}.createAccount.message`,
    defaultMessage: 'Create Account',
  },
  emailRegistration: {
    id: `${scope}.emailRegistration.message`,
    defaultMessage: 'or use your email for registration',
  },
  signUp: {
    id: `${scope}.signUp.message`,
    defaultMessage: 'SIGN UP',
  },
});
