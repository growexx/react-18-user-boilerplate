/*
 * ChangePassword Messages
 *
 * This contains all the text for the ChangePassword container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ChangePassword';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ChangePassword container!',
  },
  notificationToastError: {
    id: `${scope}.notificationToastError`,
    defaultMessage: 'Change Password Error!',
  },
  notificationToastSuccess: {
    id: `${scope}.notificationToastSuccess`,
    defaultMessage: 'Change Password Success!',
  },
});
