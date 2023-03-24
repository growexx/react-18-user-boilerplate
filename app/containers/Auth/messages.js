/*
 * AuthContainer Messages
 *
 * This contains all the text for the Auth container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Auth';

export default defineMessages({
  sidebarSignUp: {
    id: `${scope}.sidebarLogin.message`,
    defaultMessage: 'SIGN UP',
  },
  sidebarLogin: {
    id: `${scope}.sidebarLogin.message`,
    defaultMessage: 'SIGN IN',
  },
  sidebarLoginTitle: {
    id: `${scope}.sidebarLogin.message`,
    defaultMessage: 'New Here!',
  },
  sidebarRegistrationTitle: {
    id: `${scope}.sidebarRegistration.message`,
    defaultMessage: 'Welcome Back!',
  },
  sidebarLoginSubtitle: {
    id: `${scope}.sidebarLoginSubtitle.message`,
    defaultMessage: 'To join us, please sign up with your personal info',
  },
  sidebarRegistrationSubtitle: {
    id: `${scope}.sidebarRegistrationSubtitle.message`,
    defaultMessage:
      'To keep connected with us, please log in with your personal info',
  },
});
