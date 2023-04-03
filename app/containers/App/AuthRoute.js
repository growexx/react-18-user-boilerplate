/* eslint-disable space-before-function-paren */
import React from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userExists } from 'utils/Helper';
import { ROUTES } from '../constants';

const AuthRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      element={
        !userExists() ? <Component /> : <Navigate to={ROUTES.HOME} replace />
      }
    />
  );
};

AuthRoute.propTypes = {
  component: PropTypes.func,
};

export default AuthRoute;
