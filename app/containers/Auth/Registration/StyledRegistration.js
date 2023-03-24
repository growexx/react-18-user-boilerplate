import styled from 'styled-components';
export const StyledRegistration = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .createAccount {
    margin: 0;
    text-align: center;
    font-size: @font-size-lg+26;
    font-weight: @font-weight-bold;
    color: @primary-color;
  }
  .emailRegistration {
    margin-top: @font-size-lg+15;
    color: @text-color;
    font-weight: @font-weight-regular;
    font-size: @font-size-base;
    text-align: center;
  }
  .registrationSubContainer {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    @media only screen and (max-width: 767px) {
      width: 80%;
    }
  }
  .socialIcons {
    display: flex;
  }
  .socialIcons > span {
    border: 1px solid @border-color-base;
    padding: @padding-sm;
    border-radius: 50%;
    margin: @margin-sm;
  }
  .accountData {
    input {
      margin-top: @margin-sm;
      background-color: @background-color-base;
    }
    input[value] {
      color: @text-color-secondary;
      font-size: @font-size-base+1px;
    }
    &.input-margin-0 {
      input {
        margin-top: 0;
      }
    }
    .ant-input-password {
      background-color: @background-color-base;
    }
  }
  button {
    margin-top: @font-size-lg+15;
    background: @primary-color;
    border: 2px solid @white;
    border-radius: @border-radius-base+48;
    text-align: center;
    color: @white;
    text-align: center;
    font-size: @font-size-base+1;
    font-weight: @font-weight-medium;
    height: @height-lg;
    width: 160px;
  }
  button:hover {
    background: @primary-color;
    border: 2px solid @white;
    color: @white;
  }
  button:focus {
    background: @primary-color;
    border: 2px solid @white;
    color: @white;
  }
`;
