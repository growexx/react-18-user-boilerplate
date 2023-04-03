/* eslint-disable space-before-function-paren */
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userExists } from 'utils/Helper';
import { ROUTES } from '../constants';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        userExists() ? <Component /> : <Navigate to={ROUTES.LOGIN} replace />
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
};

export default PrivateRoute;
