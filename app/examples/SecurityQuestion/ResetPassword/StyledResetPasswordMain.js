import styled from 'styled-components';

export const StyledResetPassword = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  .header {
    display: flex;
    position: relative;
    flex-wrap: wrap;
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
  }
  .link-reset {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .link-security {
    justify-content: center;
    align-items: center;
    display: inline-block;
    display: flex;
  }
  .registrationSideContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      text-align: center;
      font-size: 42px;
      font-weight: @font-weight-bold;
      margin: 0;
    }
    .subTitle {
      width: 60%;
      text-align: center;
      margin: 0;
    }
    button {
      margin-top: 35px;
      height: @height-lg;
      width: 160px;
      background: @btn-default-ghost-bg;
      border: 2px solid @white;
      border-radius: 50px;
      text-align: center;
      color: @white;
    }
    button:hover {
      color: @white;
    }
    color: @white;
  }
  .main {
    display: flex;
    flex: 0.7;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .resetPassword {
    font-weight: @font-weight-bold;
    font-size: @font-size-lg+26;
    color: @primary-color;
    margin: unset;
  }
  .sideContainer {
    background: @primary-color;
    display: flex;
    flex: 0.3;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .security-main {
    display: flex;
    flex: 0.7;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & .title {
      font-weight: @font-weight-bold;
      font-size: @font-size-lg+16;
      color: @primary-color;
    }
  }
  .title-reset {
    font-weight: @font-weight-bold;
    font-size: @font-size-lg+16;
    color: @primary-color;
  }
`;
