/**
 *
 * TwoFactorAuthentication
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import OTPInput from 'react-otp-input';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectValue } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { StyledTwoFactorAuthentication } from './StyledTwoFactorAuthentication';
import messages from './messages';
import { FORM_KEY, OTP_LENGTH } from './constants';
import AuthSideContainer from '../index';
import { AUTH_TYPE } from '../constants';
import { StyledAuthContainer } from '../StyledAuthContainer';
import { changeValue, fireSubmit } from './actions';

export function TwoFactorAuthentication(props) {
  const [otp, setOtp] = useState('');
  useInjectReducer({ key: FORM_KEY, reducer });
  useInjectSaga({ key: FORM_KEY, saga });
  const { onChangeValue } = props;

  const changeOptValue = currValue => {
    setOtp(currValue);
    onChangeValue(currValue);
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

const mapStateToProps = createStructuredSelector({
  value: makeSelectValue(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeValue: value => {
      dispatch(changeValue(value));
      if (value.length === OTP_LENGTH) {
        dispatch(fireSubmit());
      }
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TwoFactorAuthentication);
