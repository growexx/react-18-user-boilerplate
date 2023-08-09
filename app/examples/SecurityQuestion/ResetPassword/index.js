import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthSideContainer from '../../../containers/Auth';
import { AUTH_TYPE } from '../../../containers/Auth/constants';
import { ROUTES } from '../../../containers/constants';
import SecurityQuestionForm from '../SecurityQuestionForm';
import { postSecurityQuestionRegister } from '../stub';
import { StyledResetPassword } from './StyledResetPasswordMain';

function ResetPassword() {
  const navigate = useNavigate();

  const handleSubmit = data => {
    postSecurityQuestionRegister(data).then(() => {
      navigate(ROUTES.PASSWORD_CHANGE);
    });
  };
  return (
    <StyledResetPassword>
      <AuthSideContainer authType={AUTH_TYPE[0]} />
      <div className="security-main">
        <p className="title-reset">Please Verify your Security question</p>
        <SecurityQuestionForm handleSubmit={handleSubmit} isReset />
      </div>
    </StyledResetPassword>
  );
}

export default ResetPassword;
