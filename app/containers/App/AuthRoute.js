/* eslint-disable space-before-function-paren */
import React from 'react';
import { Outlet, Navigate } from 'react-router';
import { userExists } from 'utils/Helper';
import { ROUTES } from '../constants';

function AuthRoute() {
  return !userExists() ? <Outlet /> : <Navigate to={ROUTES.HOME} />;
}

export default AuthRoute;
