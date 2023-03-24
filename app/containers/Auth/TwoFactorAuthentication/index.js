/**
 *
 * TwoFactorAuthentication
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import OtpComponent from 'components/OtpComponent';
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
  useInjectReducer({ key: FORM_KEY, reducer });
  useInjectSaga({ key: FORM_KEY, saga });
  const { value, onChangeValue } = props;
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
          <OtpComponent
            value={value}
            onChange={onChangeValue}
            numInputs={OTP_LENGTH}
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
