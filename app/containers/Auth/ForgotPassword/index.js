/**
 *
 * ForgotPassword
 *
 */

import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { notification, Form, Input, Button } from 'antd';
import request from 'utils/request';
import { TEST_IDS } from './stub/test.stub';
import { StyledAuthContainer } from '../StyledAuthContainer';
import messages from './messages';
import { API_ENDPOINTS, ROUTES } from '../../constants';

import AuthSideContainer from '../index';
import { AUTH_TYPE } from '../constants';
import { StyledForgotPassword } from './StyledForgotPassword';

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const onFinish = values => {
    setLoading(true);
    // API Call
    request(`${API_ENDPOINTS.FORGOT_PASSWORD}`, {
      method: 'POST',
      body: { email: values.email },
    })
      .then(res => {
        notification.success({
          description: res.message,
        });
        setLoading(false);
      })
      .catch(async err => {
        setLoading(false);
        notification.error({
          description: (await err.response.json()).message,
        });
      });
  };

  return (
    <StyledAuthContainer>
      <AuthSideContainer authType={AUTH_TYPE[0]} />
      <StyledForgotPassword>
        <p className="forgotPassword">Reset Password</p>
        <div className="LoginSubContainer">
          <div className="accountData">
            <Form ref={formRef} onFinish={onFinish} name="control-ref">
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
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item shouldUpdate>
                {() => (
                  <Button
                    data-testid={TEST_IDS.RESET_PASSWORD}
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    disabled={
                      formRef &&
                      formRef.current &&
                      (!formRef.current.isFieldsTouched(true) ||
                        !!formRef.current
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length)
                    }
                  >
                    Reset
                  </Button>
                )}
              </Form.Item>
            </Form>
            <Link to={ROUTES.LOGIN}>Login?</Link>
          </div>
        </div>
      </StyledForgotPassword>
    </StyledAuthContainer>
  );
}

export default ForgotPassword;
