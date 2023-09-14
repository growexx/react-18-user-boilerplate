import React from 'react';
import { Outlet, Navigate } from 'react-router';
import { userExists } from 'utils/Helper';
import { ROUTES } from '../constants';

function PrivateRoute() {
  return userExists() ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
}

export default PrivateRoute;
