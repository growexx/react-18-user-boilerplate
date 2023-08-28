/**
 *
 * ChangePassword
 *
 */

import React from 'react';
import { Form, Button } from 'antd';
import { Helmet } from 'react-helmet';
import { Field, reduxForm } from 'redux-form';
import { useDispatch } from 'react-redux';

import { APassword } from 'utils/Fields';
import { changePasswordSubmit } from './slice';
import { FORM_KEY, passwordsMustMatch } from './constants';
import { compose } from 'redux';
import * as formValidations from 'utils/formValidations';

const FormItem = Form.Item;

// TODO: add react hook form
export const ChangePassword = () => {
  const dispatch = useDispatch();
  // use this if you are using login API and manage the loading error status accordingly
  // const [changePassword, { isLoading, isError }] = useChangePasswordQuery();

  const submitData = () => {
    dispatch(changePasswordSubmit());

    // use this if you are using change password API and manage the loading error status accordingly
    // changePassword();
  };

  return (
    <div>
      <Helmet>
        <title>Change Password</title>
        <meta name="description" content="Description of ChangePassword" />
      </Helmet>
      <Form
        onFinish={() => {
          submitData();
        }}
      >
        <Field
          label="Current Password"
          name="currentPassword"
          component={APassword}
          placeholder="Current Password"
          // onChange={updateField}
          hasFeedback
          // value={currentPassword}
        />

        <Field
          label="New Password"
          name="newPassword"
          component={APassword}
          placeholder="New Password"
          // onChange={updateField}
          // value={newPassword}
        />

        <Field
          label="Confirm Password"
          name="confirmNewPassword"
          component={APassword}
          placeholder="Confirm Password"
          // onChange={updateField}
          // value={confirmNewPassword}
        />
        <FormItem>
          <center>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </center>
        </FormItem>
      </Form>
    </div>
  );
};

export default compose(
  reduxForm({
    form: FORM_KEY,
    fields: ['currentPassword', 'newPassword', 'confirmNewPassword'],
    validate: formValidations.createValidator({
      currentPassword: [formValidations.required],
      newPassword: [formValidations.required],
      confirmNewPassword: [formValidations.required, passwordsMustMatch],
    }),
    touchOnChange: true,
  }),
)(ChangePassword);
