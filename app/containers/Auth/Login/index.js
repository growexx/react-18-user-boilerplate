/**
 *
 * Login
 *
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Form, Input, Button, notification } from 'antd';
import {
  FacebookFilled,
  GoogleOutlined,
  WindowsFilled,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectEmail,
  makeSelectLoading,
  makeSelectError,
  makeSelectPassword,
  makeSelectSuccess,
} from 'containers/Auth/Login/selectors';
import messages from './messages';
import { StyledLogin } from './StyledLogin';
import {
  changeEmail,
  changePassword,
  fireLogin,
  fireFacebookLogin,
  fireGoogleLogin,
} from './actions';
import { StyledAuthContainer } from '../StyledAuthContainer';
import AuthSideContainer from '../index';
import { AUTH_TYPE } from '../constants';
import { ROUTES } from '../../constants';
import { facebookLogin, googleLogin, login } from './slice';

const key = 'login';

const showNotification = () => {
  notification.open({
    message: <FormattedMessage {...messages.notificationToast} />,
  });
};
export function Login({ loading, error }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = () => {
    dispatch(login());
  };

  const onGoogleSignIn = () => {
    dispatch(googleLogin());
  };

  const onFacebookSignIn = () => {
    dispatch(facebookLogin());
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
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
        {error === true && showNotification()}
      </StyledAuthContainer>
    </Form>
  );
}

Login.propTypes = {
  history: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

// const mapStateToProps = createStructuredSelector({
//   email: makeSelectEmail(),
//   password: makeSelectPassword(),
//   loading: makeSelectLoading(),
//   error: makeSelectError(),
//   success: makeSelectSuccess(),
// });

// export function mapDispatchToProps(dispatch) {
//   return {
//     // onChangeEmail: (evt) => dispatch(changeEmail(evt.target.value)),
//     // onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),
//     onSignIn: (evt) => {
//       if (evt !== undefined && evt.preventDefault) evt.preventDefault();
//       dispatch(fireLogin());
//     },
//     onGoogleSignIn: () => {
//       dispatch(fireGoogleLogin());
//     },
//     onFacebookSignIn: () => {
//       dispatch(fireFacebookLogin());
//     },
//   };
// }

// const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default Login;
