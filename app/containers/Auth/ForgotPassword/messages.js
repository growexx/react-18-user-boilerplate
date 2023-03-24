/*
 * ForgotPassword Messages
 *
 * This contains all the text for the ForgotPassword container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ForgotPassword';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Forgot Password',
  },
  emailRequiredMessage: {
    id: `${scope}.emailRequiredMessage.message`,
    defaultMessage: 'Please input your E-mail!',
  },
  validEmail: {
    id: `${scope}.valid.message`,
    defaultMessage: 'The input is not valid E-mail!',
  },
  submit: {
    id: `${scope}.valid.message`,
    defaultMessage: 'Reset',
  },
});
