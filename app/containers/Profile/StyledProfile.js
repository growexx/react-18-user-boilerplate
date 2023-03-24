import styled from 'styled-components';

export const StyledProfile = styled.div`
  display: flex;
  flex-direction: column;
  .ant-card {
    flex: 1 !important;
    cursor: default;
  }
`;

export const CardExtraContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  p {
    color: @primary-color;
    font-size: @font-size-base;
    margin-bottom: 0;
  }
`;
