/**
 *
 * ReactHookForm
 *
 */

import React, { useState } from 'react';
import {
  Form as antForm,
  Button,
  Input,
  Radio,
  Select,
  Checkbox,
  DatePicker,
} from 'antd';
import { Helmet } from 'react-helmet';
import * as formValidations from 'utils/formValidations';
import { Controller, useForm, Form } from 'react-hook-form';
import { StyledItem } from './StyledForm';

const { Option } = Select;
const { RangePicker } = DatePicker;
const FormItem = antForm.Item;

const ReactHookForm = (props) => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [dateRange, setDateRange] = useState();

  const onSubmit = (data) => {
    const requestBody = { ...data, rangePicker: dateRange };
    // Note: Add API Call
  };

  return (
    <div>
      <div>
        <Helmet>
          <title>React Hook Form</title>
          <meta name="description" content="Description of ReactHookForm" />
        </Helmet>
      </div>
      <StyledItem>
        <Form control={control} onSubmit={handleSubmit(onSubmit)}>
          <FormItem>
            <label htmlFor="firstName">First Name: </label>
            <Controller
              control={control}
              name="firstName"
              rules={{
                required: formValidations.VALIDATION_MESSAGES.REQUIRED,
              }}
              render={({ field }) => (
                <Input
                  id="firstName"
                  style={{ borderColor: `${errors.firstName ? 'red' : ''}` }}
                  placeholder="Please Enter First Name"
                  {...field}
                />
              )}
            />
            {errors.firstName && (
              <p style={{ color: 'red' }}>{errors.firstName.message}</p>
            )}
          </FormItem>

          <FormItem>
            <label htmlFor="lastName">Last Name: </label>
            <Controller
              control={control}
              name="lastName"
              rules={{
                required: formValidations.VALIDATION_MESSAGES.REQUIRED,
              }}
              render={({ field }) => (
                <Input
                  id="lastName"
                  style={{ borderColor: `${errors.lastName ? 'red' : ''}` }}
                  placeholder="Please Enter Last Name"
                  {...field}
                />
              )}
            />
            {errors.lastName && (
              <p style={{ color: 'red' }}>{errors.lastName.message}</p>
            )}
          </FormItem>

          <FormItem>
            <label htmlFor="email">Email: </label>
            <Controller
              control={control}
              name="email"
              rules={{
                required: formValidations.VALIDATION_MESSAGES.REQUIRED,
                validate: (v) => formValidations.validEmail(v) || true,
              }}
              render={({ field }) => (
                <Input
                  type="email"
                  id="email"
                  style={{ borderColor: `${errors.email ? 'red' : ''}` }}
                  placeholder="Please Enter Email"
                  {...field}
                />
              )}
            />
            {errors.email && (
              <p style={{ color: 'red' }}>{errors.email.message}</p>
            )}
          </FormItem>

          <FormItem>
            <label htmlFor="sex">Sex: </label>
            <Controller
              control={control}
              name="sex"
              render={({ field: { onChange, value } }) => (
                <Radio.Group
                  id="sex"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                >
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Radio.Group>
              )}
            />
          </FormItem>

          <FormItem>
            <label htmlFor="favoriteColor">Favorite Color: </label>
            <Controller
              control={control}
              name="favoriteColor"
              id="favoriteColor"
              render={({ field }) => (
                <Select {...field} id="favoriteColor">
                  <Option value="ff0000">Red</Option>
                  <Option value="00ff00">Green</Option>
                  <Option value="0000ff">Blue</Option>
                </Select>
              )}
            />
          </FormItem>

          <FormItem>
            <label htmlFor="employed">Employed: </label>
            <Controller
              control={control}
              name="employed"
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  id="employed"
                  type="checkbox"
                  checked={value}
                  onChange={(e) => {
                    onChange(e.target.checked);
                  }}
                />
              )}
            />
          </FormItem>

          <FormItem>
            <label htmlFor="rangePicker">Filter dates: </label>
            <Controller
              control={control}
              name="rangePicker"
              id="rangePicker"
              render={({ field }) => (
                <RangePicker
                  {...field}
                  name="rangePicker"
                  placeholder={['From', 'To']}
                  format="YYYY-MM-DD"
                  onFocus={(e) => e.preventDefault()}
                  onBlur={(e) => e.preventDefault()}
                  onChange={(e, formatRange) => {
                    setDateRange(formatRange);
                  }}
                />
              )}
            />
          </FormItem>

          <FormItem>
            <label htmlFor="notes">Notes: </label>
            <Controller
              control={control}
              name="notes"
              id="notes"
              render={({ field }) => (
                <Input.TextArea
                  {...field}
                  data-testid="Notes"
                  placeholder="Please Enter Notes"
                />
              )}
            />
          </FormItem>

          <>
            <center>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: '10px' }}
              >
                Submit
              </Button>
              <Button
                onClick={() => {
                  reset({});
                  setValue('rangePicker', null);
                  setDateRange(null);
                }}
              >
                Clear Values
              </Button>
            </center>
          </>
        </Form>
      </StyledItem>
    </div>
  );
};

export default ReactHookForm;
