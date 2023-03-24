import styled from 'styled-components';
export const StyledTwoFactorAuthentication = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .twoFactorAuthenticationTitle {
    text-align: center;
    margin: 0;
    font-weight: @font-weight-bold;
    font-size: @font-size-lg+26;
    color: @primary-color;
  }
`;
