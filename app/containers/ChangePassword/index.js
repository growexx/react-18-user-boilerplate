/**
 *
 * ChangePassword
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form as antForm, Button, Input } from 'antd';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Controller, useForm, Form } from 'react-hook-form';
import * as formValidations from 'utils/formValidations';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FORM_KEY, passwordsMustMatch } from './constants';
import { fireSubmit, updateField as updateAction } from './actions';

const FormItem = antForm.Item;
export function ChangePassword({ loading, submitData, updateField }) {
  useInjectSaga({ key: FORM_KEY, saga });
  useInjectReducer({
    key: FORM_KEY,
    reducer,
  });

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

  const handleConfirmPasswordChange = async () => {
    await trigger('confirmNewPassword');
  };

  const isBtnDisabled = () => {
    if (Object.keys(errors).length > 0) {
      return true;
    }
    if (
      !getValues('currentPassword') ||
      !getValues('newPassword') ||
      !getValues('confirmNewPassword')
    ) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <Helmet>
        <title>Change Password</title>
        <meta name="description" content="Description of ChangePassword" />
      </Helmet>
      <Form control={control} onSubmit={handleSubmit(onSubmit)}>
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
                  updateField(e);
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
                  updateField(e);
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
                  updateField(e);
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
            <Button
              loading={loading}
              type="primary"
              disabled={isBtnDisabled()}
              htmlType="submit"
            >
              Submit
            </Button>
          </center>
        </FormItem>
      </Form>
    </div>
  );
}

ChangePassword.propTypes = {
  updateField: PropTypes.func.isRequired,
  submitData: PropTypes.func.isRequired,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    updateField: evt => {
      dispatch(updateAction(evt.target.name, evt.target.value));
    },
    submitData: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(fireSubmit());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ChangePassword);
