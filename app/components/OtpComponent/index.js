/**
 *
 * OtpComponent
 *
 */
import React from 'react';
import OtpInput from 'react-otp-input';
import PropTypes from 'prop-types';
import { StyledOtpComponent } from './StyledOtpComponent';

class OtpComponent extends React.PureComponent {
  render() {
    return (
      <StyledOtpComponent>
        <OtpInput
          value={this.props.value}
          onChange={this.props.onChange}
          numInputs={this.props.numInputs}
          separator={this.props.separator}
          placeholder={this.props.placeholder}
          // container of inputs
          containerStyle={this.props.containerStyle}
          // each input
          inputStyle={this.props.inputStyle}
          // Style applied or class passed to inputs on focus.
          focusStyle={this.props.focusStyle}
          isDisabled={this.props.isDisabled}
          // Style applied or class passed to each input when disabled.
          disabledStyle={this.props.disabledStyle}
          hasErrored={this.props.hasErrored}
          // Style applied or class passed to each input when errored.
          errorStyle={this.props.errorStyle}
          shouldAutoFocus={this.props.shouldAutoFocus}
          // Restrict input to only numbers.
          isInputNum={this.props.isInputNum}
          // Masks input characters.
          isInputSecure={this.props.isInputSecure}
        />
      </StyledOtpComponent>
    );
  }
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
