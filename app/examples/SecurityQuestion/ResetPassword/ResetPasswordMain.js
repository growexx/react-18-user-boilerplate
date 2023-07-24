import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'containers/constants';
import { StyledResetPassword } from './StyledResetPasswordMain';
import AuthSideContainer from '../../../containers/Auth';
import { AUTH_TYPE } from '../../../containers/Auth/constants';

function ResetPasswordMain() {
  return (
    <StyledResetPassword>
      <AuthSideContainer authType={AUTH_TYPE[0]} />
      <div className="main">
        <p className="resetPassword">Reset Password</p>
        <Link to={ROUTES.FORGOT_PASSWORD} className="link-reset">
          Reset Via Link
        </Link>
        <Link to={ROUTES.RESET_PASSWORD_SECURITY} className="link-security">
          Reset Via Security Question
        </Link>
      </div>
    </StyledResetPassword>
  );
}

export default ResetPasswordMain;
