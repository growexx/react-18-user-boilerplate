import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button } from 'antd';
import messages from './messages';
import { AUTH_TYPE } from './constants';
import { ROUTES } from '../constants';

const getLoginSideContent = () => (
  <div className="loginContainer">
    <div className="registrationSideContainer">
      <p className="title">
        <FormattedMessage {...messages.sidebarLoginTitle} />
      </p>
      <p className="subTitle">
        <FormattedMessage {...messages.sidebarLoginSubtitle} />
      </p>
      <Link to={ROUTES.REGISTER}>
        <Button>
          <FormattedMessage {...messages.sidebarSignUp} />
        </Button>
      </Link>
    </div>
  </div>
);
const getRegisterSideContent = () => (
  <div className="registrationSideContainer">
    <p className="title">
      <FormattedMessage {...messages.sidebarRegistrationTitle} />
    </p>
    <p className="subTitle">
      <FormattedMessage {...messages.sidebarRegistrationSubtitle} />
    </p>
    <Link to={ROUTES.LOGIN}>
      <Button>
        <FormattedMessage {...messages.sidebarLogin} />
      </Button>
    </Link>
  </div>
);
const AuthSideContainer = props => (
  <div className="sideContainer">
    {props.authType === AUTH_TYPE[0]
      ? getLoginSideContent()
      : getRegisterSideContent()}
  </div>
);

export default AuthSideContainer;

AuthSideContainer.propTypes = {
  authType: PropTypes.string,
};
