import React from 'react';
import { notification } from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export const showNotification = (err, type) => {
  if (type === 'error') {
    notification.error({
      message: <FormattedMessage {...messages.notificationToastError} />,
      description: err,
    });
  } else {
    notification.success({
      message: <FormattedMessage {...messages.notificationToastSuccess} />,
      description: err,
    });
  }
};
