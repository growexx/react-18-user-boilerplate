/**
 *
 * ForgotPassword
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import request from 'utils/request';
import { notification, Form, Input, Button } from 'antd';
import { TEST_IDS } from './stub/test.stub';
import { StyledAuthContainer } from '../StyledAuthContainer';
import messages from './messages';
import { API_ENDPOINTS, ROUTES } from '../../constants';

import AuthSideContainer from '../index';
import { AUTH_TYPE } from '../constants';
import { StyledForgotPassword } from './StyledForgotPassword';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  formRef = React.createRef();

  onFinish = values => {
    this.setState({
      loading: true,
    });
    // API Call
    request(`${API_ENDPOINTS.FORGOT_PASSWORD}`, {
      method: 'POST',
      body: { email: values.email },
    })
      .then(res => {
        notification.success({
          description: res.message,
        });
        this.setState({
          loading: false,
        });
      })
      .catch(async err => {
        this.setState({
          loading: false,
        });
        notification.error({
          description: (await err.response.json()).message,
        });
      });
  };

  render() {
    return (
      <StyledAuthContainer>
        <AuthSideContainer authType={AUTH_TYPE[0]} />
        <StyledForgotPassword>
          <p className="forgotPassword">Reset Password</p>
          <div className="LoginSubContainer">
            <div className="accountData">
              <Form
                ref={this.formRef}
                onFinish={this.onFinish}
                name="control-ref"
              >
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
                      loading={this.state.loading}
                      type="primary"
                      htmlType="submit"
                      disabled={
                        this.formRef &&
                        this.formRef.current &&
                        (!this.formRef.current.isFieldsTouched(true) ||
                          !!this.formRef.current
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
}
export default ForgotPassword;
