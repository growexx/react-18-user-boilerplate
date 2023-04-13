/* eslint-disable react/no-array-index-key */
/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import Profile from 'containers/Profile/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import UnauthorizedPage from 'containers/UnauthorizedPage/Loadable';
import Login from 'containers/Auth/Login/Loadable';
import TwoFactorAuthentication from 'containers/Auth/TwoFactorAuthentication/Loadable';
import Logout from 'containers/Auth/Logout/Loadable';
import Loader from 'examples/ListLoader/Loadable';
import Register from 'containers/Auth/Registration/Loadable';
import ExportDataToCsv from 'examples/ExportDataToCsv/Loadable';
import Users from 'examples/Users/Loadable';
import Charts from 'examples/Charts/Loadable';
import Products from 'examples/Products/Loadable';
import SampleForm from 'examples/SampleForm/Loadable';
import ChangePassword from 'containers/ChangePassword/Loadable';
import MultiTabSupport from 'examples/MultiTabSupport/Loadable';
import ForgotPassword from 'containers/Auth/ForgotPassword/Loadable';
import NumeralConversion from 'examples/NumeralConversion/Loadable';
import { FAV_ICONS } from './constants';
import PrivateRoute from './PrivateRoute';
import RoleMiddleWare from './RoleMiddleWare';
import AuthRoute from './AuthRoute';
import GlobalStyle from '../../global-styles';
import { ROUTES } from '../constants';
import { manageSession } from '../../utils/Helper';

const AppWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

export default function App() {
  useEffect(() => {
    window.addEventListener('storage', manageSession, []);
    return () => {
      window.removeEventListener('storage', window);
    };
  }, []);

  return (
    <AppWrapper data-testid="AppRoutes">
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
        {FAV_ICONS.map((favIcon, index) => (
          <link {...favIcon} key={index} />
        ))}
      </Helmet>
      <Routes>
        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route exact path={ROUTES.HOME} element={<FeaturePage />} />
          <Route path={ROUTES.GITHUB_SEARCH} element={<HomePage />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.LOGOUT} element={<Logout />} />
          <Route path={ROUTES.LOADER} element={<Loader />} />
          <Route path={ROUTES.EXPORT_DATA} element={<ExportDataToCsv />} />
          <Route path={ROUTES.USERS} element={<Users />} />
          <Route path={ROUTES.CHARTS} element={<Charts />} />
          <Route path={ROUTES.PRODUCTS} element={<Products />} />
          <Route
            path={ROUTES.MULTI_TAB_SUPPORT}
            element={<MultiTabSupport />}
          />
          <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword />} />
          <Route path={ROUTES.SAMPLE_FORM} element={<SampleForm />} />
          <Route
            path={ROUTES.NUMERAL_CONVERTER}
            element={<NumeralConversion />}
          />
        </Route>
        {/* RoleMiddleware */}
        <Route element={<RoleMiddleWare />}>
          <Route
            path={ROUTES.TEST_ADMIN_PAGE}
            element={() => <div>This is Admin Role Page</div>}
            // ShowError redirects to 403
            // showError
          />
        </Route>
        {/* Auth Routes */}
        <Route element={<AuthRoute />}>
          <Route exact path={ROUTES.LOGIN} element={<Login />} />
          <Route
            exact
            path={ROUTES.TWO_FACTOR_AUTHENTICATION}
            element={<TwoFactorAuthentication />}
          />
          <Route exact path={ROUTES.REGISTER} element={<Register />} />
          <Route
            exact
            path={ROUTES.FORGOT_PASSWORD}
            element={<ForgotPassword />}
          />
        </Route>
        <Route exact path={ROUTES.UNAUTHORIZED} component={UnauthorizedPage} />
        <Route path="" component={NotFoundPage} />
      </Routes>
      <GlobalStyle />
    </AppWrapper>
  );
}
