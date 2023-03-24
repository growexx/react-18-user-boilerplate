/**
 *
 * SampleForm
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import * as formValidations from 'utils/formValidations';
import { Form, Radio, Button, Select } from 'antd';
import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import {
  AInput,
  ARangePicker,
  ARadioGroup,
  ACheckbox,
  ASelect,
  ATextarea,
} from 'utils/Fields';
import makeSelectSampleForm from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
const FormItem = Form.Item;

const FORM_KEY = 'sampleForm';
const { Option } = Select;

export class SampleForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleFormSubmit = () => {
    const { submitData } = this.props;
    submitData();
  };

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      updateField,
    } = this.props;

    return (
      <div>
        <Helmet>
          <title>SampleForm</title>
          <meta name="description" content="Description of SampleForm" />
        </Helmet>
        <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Field
            label="First Name"
            name="firstName"
            component={AInput}
            placeholder="First Name"
            onChange={e => updateField(e.target.name, e.target.value)}
            hasFeedback
          />

          <Field
            label="Last Name"
            name="lastName"
            component={AInput}
            placeholder="Last Name"
            onChange={e => updateField(e.target.name, e.target.value)}
          />

          <Field
            label="Email"
            name="email"
            component={AInput}
            type="email"
            placeholder="Email"
            onChange={e => updateField(e.target.name, e.target.value)}
          />

          <Field label="Sex" name="sex" component={ARadioGroup} value="male">
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Field>

          <Field
            label="Favorite Color"
            name="favoriteColor"
            component={ASelect}
            onChange={e => updateField('favoriteColor', e)}
          >
            <Option value="ff0000">Red</Option>
            <Option value="00ff00">Green</Option>
            <Option value="0000ff">Blue</Option>
          </Field>

          <Field
            label="Employed"
            name="employed"
            id="employed"
            component={ACheckbox}
            type="checkbox"
            onChange={e => updateField('employed', e.target.checked)}
          />

          <Field
            label="Filter dates"
            name="rangepicker"
            component={ARangePicker}
            placeholder={['From', 'To']}
            hasFeedback
            onFocus={e => e.preventDefault()}
            onChange={e => updateField('rangepicker', e)}
            onBlur={e => e.preventDefault()}
          />

          <Field
            data-testid="Notes"
            label="Notes"
            name="notes"
            component={ATextarea}
            onChange={e => updateField('Notes', e.target.value)}
          />

          <FormItem>
            <center>
              <Button
                type="primary"
                disabled={pristine || submitting}
                htmlType="submit"
                style={{ marginRight: '10px' }}
                onClick={handleSubmit(this.handleFormSubmit)}
              >
                Submit
              </Button>

              <Button disabled={pristine || submitting} onClick={reset}>
                Clear Values
              </Button>
            </center>
          </FormItem>
        </Form>
      </div>
    );
  }
}

SampleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired,
  submitData: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
};

const withReducer = useInjectReducer({
  key: FORM_KEY,
  reducer,
});

const withSaga = useInjectSaga({ key: FORM_KEY, saga });

const mapStateToProps = createStructuredSelector({
  sampleForm: makeSelectSampleForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateField: (key, value) => dispatch(actions.updateField(key, value)),
    submitData: () => dispatch(actions.submitData()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  reduxForm({
    form: FORM_KEY,
    fields: ['firstName', 'email', 'rangePicker', 'employed', 'lastName'],
    validate: formValidations.createValidator({
      firstName: [formValidations.required],
      lastName: [formValidations.required],
      email: [formValidations.required, formValidations.validEmail],
    }),
    touchOnChange: true,
  }),
)(SampleForm);
