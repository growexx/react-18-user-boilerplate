/**
 *
 * ChangePassword
 *
 */

import React from 'react';
import { Form as antForm, Button, Input } from 'antd';
import { Helmet } from 'react-helmet';
import { Controller, useForm, Form } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as formValidations from 'utils/formValidations';
import { passwordsMustMatch } from './constants';
import { changePasswordSubmit } from './slice';

const FormItem = antForm.Item;
export function ChangePassword() {
  const dispatch = useDispatch();
  // use this if you are using login API and manage the loading error status accordingly
  // const [changePassword, { isLoading, isError }] = useChangePasswordMutation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    trigger,
    getValues,
  } = useForm();

  const onSubmit = () => {
    submitData();
    reset({});
  };

  const submitData = () => {
    dispatch(changePasswordSubmit());
    // use this if you are using change password API and manage the loading error status accordingly
    // changePassword();
  };

  const handleConfirmPasswordChange = async () => {
    await trigger('confirmNewPassword');
  };

  return (
    <div>
      <Helmet>
        <title>Change Password</title>
        <meta name="description" content="Description of ChangePassword" />
      </Helmet>
      <Form control={control} onSubmit={handleSubmit(onSubmit)} role="form">
        <FormItem>
          <label htmlFor="currentPassword">Current Password: </label>
          <Controller
            control={control}
            name="currentPassword"
            rules={{
              required: formValidations.VALIDATION_MESSAGES.REQUIRED,
            }}
            render={({ field }) => (
              <Input.Password
                id="currentPassword"
                style={{
                  borderColor: `${errors.currentPassword ? 'red' : ''}`,
                }}
                placeholder="Current Password"
                {...field}
                onChange={e => {
                  field.onChange(e);
                }}
              />
            )}
          />
          {errors.currentPassword && (
            <p style={{ color: 'red' }}>{errors.currentPassword.message}</p>
          )}
        </FormItem>

        <FormItem>
          <label htmlFor="newPassword">New Password: </label>
          <Controller
            control={control}
            name="newPassword"
            rules={{
              required: formValidations.VALIDATION_MESSAGES.REQUIRED,
            }}
            render={({ field }) => (
              <Input.Password
                id="newPassword"
                style={{
                  borderColor: `${errors.newPassword ? 'red' : ''}`,
                }}
                placeholder="New Password"
                {...field}
                onChange={e => {
                  field.onChange(e);
                  if (getValues('confirmNewPassword')) {
                    handleConfirmPasswordChange();
                  }
                }}
              />
            )}
          />
          {errors.newPassword && (
            <p style={{ color: 'red' }}>{errors.newPassword.message}</p>
          )}
        </FormItem>

        <FormItem>
          <label htmlFor="confirmNewPassword">Confirm Password: </label>
          <Controller
            control={control}
            name="confirmNewPassword"
            rules={{
              required: formValidations.VALIDATION_MESSAGES.REQUIRED,
              validate: passwordsMustMatch,
            }}
            render={({ field }) => (
              <Input.Password
                id="confirmNewPassword"
                style={{
                  borderColor: `${errors.confirmNewPassword ? 'red' : ''}`,
                }}
                placeholder="Confirm Password"
                {...field}
                onChange={e => {
                  field.onChange(e);
                  handleConfirmPasswordChange();
                }}
              />
            )}
          />
          {errors.confirmNewPassword && (
            <p style={{ color: 'red' }}>{errors.confirmNewPassword.message}</p>
          )}
        </FormItem>

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
}

export default ChangePassword;
