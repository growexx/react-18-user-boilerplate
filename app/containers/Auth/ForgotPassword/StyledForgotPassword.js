import styled from 'styled-components';
export const StyledForgotPassword = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  .LoginSubContainer {
    width: 40%;
    flex-direction: column;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    text-align: center;
    @media only screen and (max-width: 767px) {
      width: 80%;
    }
  }
  .forgotPassword {
    text-align: center;
    margin: 0;
    font-weight: @font-weight-bold;
    font-size: @font-size-lg+26;
    color: @primary-color;
  }
  button:focus {
    background: @primary-color;
    border: 2px solid @white;
    color: @white;
  }
  button {
    color: @white;
    background: @primary-color;
    border: 2px solid @white;
    border-radius: 50px;
    text-align: center;
    text-align: center;
    font-size: @font-size-base+1;
    font-weight: @font-weight-medium;
    height: @height-lg;
    width: 160px;
    margin-top: 31px;
  }
  button:hover {
    background: @primary-color;
    border: 2px solid @white;
    color: @white;
  }
`;
