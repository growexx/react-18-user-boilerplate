import { defineMessages } from 'react-intl';

export const scope = 'app.graphql';

export default defineMessages({
  notificationToastError: {
    id: `${scope}.notificationToastError`,
    defaultMessage: 'Some Error Occurred!',
  },
  networkError: {
    id: `${scope}.notificationToastError`,
    defaultMessage:
      'Oops! You are not connected. Please check your connection and try again',
  },
});
