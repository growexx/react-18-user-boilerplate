/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
/* import { Spin } from 'antd'; */
import {
  RESTRICTED_ROUTES,
  ROLE_BASED_ROUTE_ACCESS,
  ROLE_BASED_DEFAULT_ROUTE,
  ROUTES,
} from '../constants';
import { USER_DATA_KEY } from '../../utils/constants';
import StorageService from '../../utils/StorageService';
import { loginSuccessResponse } from '../Auth/Login/stub/login.stub';
import { withRouter } from './withRouter';

export function getDerivedStateFromProps(props, state) {
  // Only check if route is restricted or not
  // Only Reset isRestrictedRoute if userData is not fetched
  if (!state.userData || !Object.keys(state.userData).length) {
    const isRestrictedRoute = RESTRICTED_ROUTES.includes(props.path);

    return {
      ...state,
      isRestrictedRoute,
      loader: isRestrictedRoute,
    };
  }
  return state;
}

function RoleMiddleWare(props) {
  /**
   * NOTE: for actual implementation of the component, remove comments with following note  "ACTUAL API INTEGRATION CODE" and remove demo code
   */
  const [loader, setLoader] = useState(true);
  const [userData, setUserData] = useState({});
  const [isRestrictedRoute, setIsRestrictedRoute] = useState(true);
  const { component: Component, ...rest } = props;

  // Get role routes
  const doesRoleHaveRouteAccess = (role, route) =>
    (ROLE_BASED_ROUTE_ACCESS[role || 'user'] || []).includes(route);

  /**
   * Fetch user data and store in local state
   */
  /* ACTUAL API INTEGRATION CODE
  const fetchUserRole = () => {
    const data = {
      method: 'GET',
    };
    const requestURL = `${API_ENDPOINTS.USER_DETAILS_API}`;
    request(requestURL, data).then(response => {
      if (response.status) {
        // Save in local storage
        StorageService.set(USER_DATA_KEY, response.data);
        setUserData(response.data);
        takeDecision((response.data && response.data.role) || '');
      } else {
        logout();
        props.navigate('/login');
      }
    });
  };
  */

  /**
   * Takes decision and stop the loader
   */
  const takeDecision = role => {
    setLoader(false);
    /**
     * doesRoleHaveRouteAccess (role, path)
     * Check which path do you need to pass based on paths defined in constant file
     */
    if (!doesRoleHaveRouteAccess(role, props.path)) {
      if (props.showError) {
        props.navigate(ROUTES.UNAUTHORIZED);
      } else {
        props.navigate(ROLE_BASED_DEFAULT_ROUTE[role]);
      }
    }
  };

  // On component load get user data
  useEffect(() => {
    // ACTUAL API INTEGRATION CODE
    // if (isRestrictedRoute) {
    //   fetchUserRole();
    // }

    const response = loginSuccessResponse;
    StorageService.set(USER_DATA_KEY, response.data);
    setUserData(response.data);
    takeDecision((response.data && response.data.role) || '');
  }, []);

  return (
    <>
      <Outlet {...rest} Component={null} userData={userData} />

      {/* ACTUAL API INTEGRATION CODE */}
      {/* {loader ? <Spin spinning={loader} size="large" /> : (
        <Outlet {...rest} Component={null} userData={userData} />
      )} */}
    </>
  );
}

RoleMiddleWare.propTypes = {
  history: PropTypes.any,
  childProps: PropTypes.any,
  component: PropTypes.any,
  path: PropTypes.string,
  navigate: PropTypes.func,
  showError: PropTypes.bool,
};

export default withRouter(RoleMiddleWare);
