import styled from 'styled-components';

export const StyledSecurityQuestion = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title-main {
    font-weight: @font-weight-bold;
    font-size: @font-size-lg+16;
    color: @primary-color;
  }
  .question-form {
    max-width: 460px;
  }
`;
