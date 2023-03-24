import styled from 'styled-components';

export const ListWithInfiniteLoader = styled.div`
  .demo-infinite-container {
    overflow: auto;
    border-radius: 4px;
  }
  .demo-loading-container {
    position: absolute;
    bottom: 40px;
    width: 100%;
    text-align: center;
  }
`;

export const StyledList = styled.div`
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: @primary-color;
  }
`;
