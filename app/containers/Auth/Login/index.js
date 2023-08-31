/**
 *
 * Login
 *
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Form, Input, Button } from 'antd';
import {
  FacebookFilled,
  GoogleOutlined,
  WindowsFilled,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import messages from './messages';
import { StyledLogin } from './StyledLogin';
import { StyledAuthContainer } from '../StyledAuthContainer';
import AuthSideContainer from '../index';
import { AUTH_TYPE } from '../constants';
import { ROUTES } from '../../constants';
import { facebookLogin, googleLogin, login } from './slice';

// const showNotification = () => {
//   notification.open({
//     message: <FormattedMessage {...messages.notificationToast} />,
//   });
// };
export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // use this if you are using login API and manage the loading error status accordingly
  // const [loginUser, { isLoading, isError }] = useLoginUserMutation();

  const onSignIn = () => {
    // call loginUser mutation if you are calling login API and set Tokens accordingly
    // loginUser()

    setLoading(true);
    dispatch(login());
    setLoading(false);
    // do navigation based on condition
    navigate(ROUTES.HOME);
  };

  const onGoogleSignIn = () => {
    dispatch(googleLogin());
  };

  const onFacebookSignIn = () => {
    dispatch(facebookLogin());
  };

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  return (
    <Form onFinish={onSignIn}>
      <StyledAuthContainer>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Description of Login" />
        </Helmet>
        <AuthSideContainer authType={AUTH_TYPE[0]} />
        <StyledLogin>
          <p className="createAccount">
            <FormattedMessage {...messages.accountDetails} />
          </p>
          <div className="LoginSubContainer">
            <div className="socialIcons">
              <FacebookFilled onClick={onFacebookSignIn} />
              <GoogleOutlined onClick={onGoogleSignIn} />
              <WindowsFilled />
            </div>
            <p className="emailLogin">
              <FormattedMessage {...messages.emailLogin} />
            </p>
            <div className="accountData">
              <Form.Item
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: <FormattedMessage {...messages.validEmail} />,
                  },
                  {
                    required: true,
                    message: (
                      <FormattedMessage {...messages.emailRequiredMessage} />
                    ),
                  },
                ]}
              >
                <Input
                  placeholder="Email"
                  onChange={onChangeEmail}
                  type="email"
                  value={email}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage {...messages.passwordRequiredMessage} />
                    ),
                  },
                ]}
              >
                <Input.Password
                  value={password}
                  placeholder="Password"
                  onChange={onChangePassword}
                  type="password"
                />
              </Form.Item>
            </div>
            <Form.Item>
              <Button loading={loading} htmlType="submit">
                <FormattedMessage {...messages.signIn} />
              </Button>
            </Form.Item>
          </div>
          <Link to={ROUTES.FORGOT_PASSWORD}>
            <FormattedMessage {...messages.forgotPassword} />
          </Link>
        </StyledLogin>
        {/* handle error stats */}
        {/* {isError && showNotification()} */}
      </StyledAuthContainer>
    </Form>
  );
}

Login.propTypes = {
  history: PropTypes.object,
  loading: PropTypes.bool,
};

export default Login;
