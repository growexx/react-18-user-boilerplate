/* eslint-disable space-before-function-paren */
import React from 'react';
import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { userExists } from 'utils/Helper';
import { ROUTES } from '../constants';

const AuthRoute = mainProps => {
  const { component: Component, ...rest } = mainProps;

  return (
    <Route
      {...rest}
      render={props =>
        !userExists() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.HOME,
            }}
          />
        )
      }
    />
  );
};

AuthRoute.propTypes = {
  component: PropTypes.func,
};

export default AuthRoute;
