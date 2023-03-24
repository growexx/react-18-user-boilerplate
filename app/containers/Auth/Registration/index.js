/**
 *
 * Registration
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Input, Button, Form } from 'antd';
import messages from './messages';
import { StyledRegistration } from './StyledRegistration';
import AuthSideContainer from '../index';
import { AUTH_TYPE } from '../constants';
import { StyledAuthContainer } from '../StyledAuthContainer';

export function Registration() {
  return (
    <StyledAuthContainer>
      <Helmet>
        <title>Registration</title>
        <meta name="description" content="Description of Registration" />
      </Helmet>
      <AuthSideContainer authType={AUTH_TYPE[1]} />
      <StyledRegistration>
        <p className="createAccount">
          <FormattedMessage {...messages.createAccount} />
        </p>
        <div className="registrationSubContainer">
          <p className="emailRegistration">
            <FormattedMessage {...messages.emailRegistration} />
          </p>
          <div className="accountData input-margin-0">
            <Form>
              <Form.Item name="username">
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item name="email">
                <Input type="email" placeholder="email" />
              </Form.Item>

              <Form.Item name="password">
                <Input.Password type="password" placeholder="Password" />
              </Form.Item>
            </Form>
          </div>
          <Button>
            <FormattedMessage {...messages.signUp} />
          </Button>
        </div>
      </StyledRegistration>
    </StyledAuthContainer>
  );
}

export default Registration;
