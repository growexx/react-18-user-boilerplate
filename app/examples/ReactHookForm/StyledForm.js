import styled from 'styled-components';

export const StyledItem = styled.div`
  display: flex;
  margin: 0 auto;
  form {
    margin: auto;
    .ant-form-item-control-input-content {
      display: flex;
      label {
        width: 120px;
        text-align: left;
      }
      input[type='text'],
      input[type='email'],
      .ant-select,
      textarea {
        width: 500px;
      }
      p {
        margin: 0 10px;
      }
    }
  }
`;
