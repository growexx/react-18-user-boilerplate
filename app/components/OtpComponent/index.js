/**
 *
 * OtpComponent
 *
 */
import React from 'react';
import OtpInput from 'react-otp-input';
import PropTypes from 'prop-types';
import { StyledOtpComponent } from './StyledOtpComponent';

const OtpComponent = props => {
  return (
    <StyledOtpComponent>
      <OtpInput
        renderInput={props => <input {...props} />}
        value={props.value}
        onChange={props.onChange}
        numInputs={props.numInputs}
        separator={props.separator}
        placeholder={props.placeholder}
        // container of inputs
        containerStyle={props.containerStyle}
        // each input
        inputStyle={props.inputStyle}
        // Style applied or class passed to inputs on focus.
        focusStyle={props.focusStyle}
        isDisabled={props.isDisabled}
        // Style applied or class passed to each input when disabled.
        disabledStyle={props.disabledStyle}
        hasErrored={props.hasErrored}
        // Style applied or class passed to each input when errored.
        errorStyle={props.errorStyle}
        shouldAutoFocus={props.shouldAutoFocus}
        // Restrict input to only numbers.
        isInputNum={props.isInputNum}
        // Masks input characters.
        isInputSecure={props.isInputSecure}
      />
    </StyledOtpComponent>
  );
}

OtpComponent.propTypes = {
  separator: PropTypes.node,
  numInputs: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isDisabled: PropTypes.bool,
  hasErrored: PropTypes.bool,
  shouldAutoFocus: PropTypes.bool,
  isInputNum: PropTypes.bool,
  isInputSecure: PropTypes.bool,
  containerStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  focusStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabledStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  errorStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  inputStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

OtpComponent.defaultProps = {
  separator: <span>-</span>,
  numInputs: 6,
  placeholder: '000000',
  isDisabled: false,
  hasErrored: false,
  shouldAutoFocus: true,
  isInputNum: true,
  isInputSecure: false,
  inputStyle: 'otpComponentInputStyle',
  containerStyle: 'otpComponentContainerStyle',
  focusStyle: 'otpComponentFocusStyle',
  disabledStyle: 'otpComponentDisabledStyle',
  errorStyle: 'otpComponentErrorStyle',
};

export default OtpComponent;
