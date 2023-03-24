import styled from 'styled-components';

export const StyledFeaturePage = styled.div`
  overflow: hidden;
  p {
    margin-bottom: 30px;
  }
  div {
    box-shadow: 0 0 3px #f0f2f5;
    background: #f0f2f5;
    border-radius: 20px;
    overflow: auto;
    height: calc(100vh - 120px);
    padding: 12px;
  }
  h1 {
    color: @primary-color;
  }
  h2,
  ol {
    display: none;
  }
  table {
    margin: 10px;
    overflow: hidden;
    th {
      font-size: @font-size-lg;
      color: @primary-color;
      display: none;
    }
    tr:not(:first-child) {
      border-bottom: 2px solid @grey;
    }
    td:first-child {
      border-right: 2px solid @grey;
    }
    td {
      padding: 12px 13px;
      font-size: 15px;
      font-weight: bold;
    }
  }
`;
