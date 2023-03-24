import styled from 'styled-components';
export const StyledOtpComponent = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .otpComponentContainerStyle {
    width: 100%;
  }
  .otpComponentInputStyle {
    color: @primary-color;
    border: @border-width-base solid @border-color-base;
    width: 100% !important;
    height: @height-lg;
    border-radius: @border-radius-base+8;
  }
  .otpComponentFocusStyle {
    border: @border-width-base solid @primary-color;
    outline: none;
    border-radius: @border-radius-base+8;
  }
  .otpComponentDisabledStyle {
    background: @disabled-bg;
  }
  .otpComponentErrorStyle {
    border: @border-width-base solid @error-color;
  }
`;
