/* eslint-disable react/prop-types */
/**
 * Redux-form Fields
 */
import React from 'react';
import { Form, Input, Radio, Select, Checkbox, DatePicker } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const makeField = Component => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  ...rest
}) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      {...formItemLayout}
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest}>
        {children}
      </Component>
    </FormItem>
  );
};

export const AInput = makeField(Input);
export const APassword = makeField(Input.Password);
export const ARadioGroup = makeField(RadioGroup);
export const ASelect = makeField(Select);
export const ACheckbox = makeField(Checkbox);
export const ATextarea = makeField(TextArea);
export const ARangePicker = makeField(RangePicker);
