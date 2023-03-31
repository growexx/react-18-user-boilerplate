import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
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

function RoleMiddleWare(props) {
  /**
   * NOTE: for actual implementation of the component, remove comments with following note  "ACTUAL API INTEGRATION CODE" and remove demo code
   */
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [userData, setUserData] = useState({});
  const isRestrictedRoute = RESTRICTED_ROUTES.includes(props.path);

  // Get role routes
  const doesRoleHaveRouteAccess = (role, route) =>
    (ROLE_BASED_ROUTE_ACCESS[role || 'user'] || []).includes(route);

  useEffect(() => {
    /**
     * ACTUAL API INTEGRATION CODE
    if (isRestrictedRoute) {
      fetchUserRole();
    }
    */
    // -------------Demo--------------------
    const response = loginSuccessResponse;
    // Save in local storage
    StorageService.set(USER_DATA_KEY, response.data);
    setUserData(response.data);
    takeDecision((response.data && response.data.role) || '');
    // -------------Demo--------------------
  }, [isRestrictedRoute]);

  /**
   * Fetch user data and store in local state
   */
  /**
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
          navigate('/login');
        }
      });
    }
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
        navigate(ROUTES.UNAUTHORIZED);
      } else {
        navigate(ROLE_BASED_DEFAULT_ROUTE[role]);
      }
    }
  };

  return (
    <>
      {/* Note: Remove in actual Code */}
      {/* {loader && <Spin spinning={loader} size="large" />} */}
      <props.component {...props.rest} Component={null} userData={userData} />
    </>
  );
}

RoleMiddleWare.propTypes = {
  childProps: PropTypes.any,
  component: PropTypes.any,
  path: PropTypes.string,
  showError: PropTypes.bool,
};

export default RoleMiddleWare;
