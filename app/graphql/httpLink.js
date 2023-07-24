import React from 'react';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import { notification } from 'antd';
import StorageService from 'utils/StorageService';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import messages from './messages';

const extractMessage = errorExtension => {
  const exception = errorExtension && errorExtension.exception;
  const errorResponse = exception.response;
  const defaultError = {
    statusCode: 500,
    message: 'Something went wrong!',
  };
  if (errorResponse) {
    // Input Validation Failed
    if (!errorResponse.response && typeof errorResponse === 'string') {
      // HTTP Exception
      return {
        statusCode: exception.status,
        message: errorResponse,
      };
    }
    if (!errorResponse.response) {
      return {
        statusCode: errorResponse.statusCode,
        message:
          (Array.isArray(errorResponse.message) &&
            errorResponse.message.length &&
            errorResponse.message[0]) ||
          exception.message,
      };
    }
    if (errorResponse.response) {
      // Actual Error
      if (typeof errorResponse.response === 'string') {
        return {
          statusCode: errorResponse.status,
          message: errorResponse.response,
        };
      }
      return {
        statusCode: errorResponse.response.statusCode,
        message: errorResponse.response.message,
      };
    }
    return defaultError;
  }
  // No error extracted
  return defaultError;
};

export const errorLink = onError(error => {
  // eslint-disable-next-line no-console
  console.log(
    'error',
    JSON.stringify(error.graphQLErrors, null, 2),
    JSON.stringify(error.networkError, null, 2),
  );
  if (error.graphQLErrors && error.graphQLErrors.length) {
    const errorData = extractMessage(get(error, 'graphQLErrors[0].extensions'));
    if (errorData.statusCode === 401) {
      StorageService.clear();
      // For public urls, do not refresh the page and just show toast
      if (!['/pin', '/'].includes(window.location.pathname)) {
        window.location.reload('/');
      } else {
        // Show 401 error message on public page
        notification.error({
          message: <FormattedMessage {...messages.notificationToastError} />,
          description: errorData.message,
        });
      }
      return;
    }
    if (errorData.statusCode === 403) {
      window.location = '/403';
      return;
    }
    if (errorData.statusCode === 404) {
      window.location = '/404';
      return;
    }
    notification.error({
      message: <FormattedMessage {...messages.notificationToastError} />,
      description: errorData.message,
    });
    return;
  }
  if (error.networkError) {
    // eslint-disable-next-line no-console
    console.log(`Network error: ${error.networkError}`);
    notification.error({
      message: <FormattedMessage {...messages.notificationToastError} />,
      description: <FormattedMessage {...messages.networkError} />,
    });
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createHttpLink({
  uri:
    process.env
      .REACT_APP_GRAPHQL_ENDPOINT /** https://48p1r2roz4.sse.codesandbox.io */,
});

export const link = errorLink.concat(authLink.concat(httpLink));
