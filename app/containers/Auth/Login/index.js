/**
 *
 * Login
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Form, Input, Button, notification } from 'antd';
import {
  FacebookFilled,
  GoogleOutlined,
  WindowsFilled,
} from '@ant-design/icons';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import messages from './messages';
import { StyledLogin } from './StyledLogin';
import { changeEmail, changePassword, fireLogin } from './actions';
import reducer from './reducer';
import saga from './saga';
import { selectLogin } from './selectors';
import { StyledAuthContainer } from '../StyledAuthContainer';
import AuthSideContainer from '../index';
import { AUTH_TYPE } from '../constants';
import { ROUTES } from '../../constants';

const key = 'login';

const showNotification = () => {
  notification.open({
    message: <FormattedMessage {...messages.notificationToast} />,
  });
};
export function Login() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();
  const stateToProps = useSelector(state => selectLogin(state), shallowEqual);
  return (
    <Form onFinish={() => dispatch(fireLogin())}>
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
              <FacebookFilled />
              <GoogleOutlined />
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
                  onChange={evt => dispatch(changeEmail(evt.target.value))}
                  type="email"
                  value={stateToProps.email}
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
                  value={stateToProps.password}
                  placeholder="Password"
                  onChange={evt => dispatch(changePassword(evt.target.value))}
                  type="password"
                />
              </Form.Item>
            </div>
            <Form.Item>
              <Button loading={stateToProps.loading} htmlType="submit">
                <FormattedMessage {...messages.signIn} />
              </Button>
            </Form.Item>
          </div>
          <Link to={ROUTES.FORGOT_PASSWORD}>
            <FormattedMessage {...messages.forgotPassword} />
          </Link>
        </StyledLogin>
        {stateToProps.error === true && showNotification()}
      </StyledAuthContainer>
    </Form>
  );
}

export default Login;
