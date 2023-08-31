/**
 *
 * TwoFactorAuthentication
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import OTPInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { StyledTwoFactorAuthentication } from './StyledTwoFactorAuthentication';
import messages from './messages';
import { OTP_LENGTH } from './constants';
import AuthSideContainer from '../index';
import { AUTH_TYPE } from '../constants';
import { StyledAuthContainer } from '../StyledAuthContainer';
import { twoFactorFormSubmit } from './slice';
import { ROUTES } from '../../constants';

export function TwoFactorAuthentication() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeOptValue = currValue => {
    console.log('changeOptValue ~ currValue:', currValue);
    setOtp(currValue);
    if (currValue.length === OTP_LENGTH) {
      dispatch(twoFactorFormSubmit());
      // handle route navigation
      navigate(ROUTES.HOME);
    }
  };

  return (
    <div>
      <Helmet>
        <title>TwoFactorAuthentication</title>
        <meta
          name="description"
          content="Description of TwoFactorAuthentication"
        />
      </Helmet>
      <StyledAuthContainer>
        <AuthSideContainer authType={AUTH_TYPE[0]} />
        <StyledTwoFactorAuthentication>
          <p className="twoFactorAuthenticationTitle">
            <FormattedMessage {...messages.twoFactorAuthenticationTitle} />
          </p>
          <OTPInput
            style
            value={otp}
            onChange={changeOptValue}
            numInputs={6}
            renderSeparator={<span>-</span>}
            inputStyle={{
              width: '40px',
              height: '40px',
              borderRadius: '15%',
              fontWeight: 'bold',
              fontSize: '18px',
            }}
            renderInput={currentProps => <input {...currentProps} />}
          />
        </StyledTwoFactorAuthentication>
      </StyledAuthContainer>
    </div>
  );
}

TwoFactorAuthentication.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeValue: PropTypes.func,
};

export default TwoFactorAuthentication;
