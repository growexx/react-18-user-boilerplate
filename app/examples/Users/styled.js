import styled from 'styled-components';
import { PageHeader, Select, Space, Table, Input } from 'antd';
const { Search } = Input;

export const AccountStatusDropDown = styled(Select)`
  width: 100%;
  max-width: 400px;
`;

export const SearchWrapper = styled(Search)`
  max-width: 500px;
`;

export const PageHeaderWrapper = styled(PageHeader)`
  .ant-page-header-heading-extra {
    width: 100%;

    // For desktop screen make filter of min sizes
    @media all and (min-width: 768px) {
      width: auto;
    }
  }
`;

export const FiltersWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media all and (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column;
    margin: 0 5px 0 0;
  }

  @media all and (min-width: 480px) and (max-width: 768px) {
    flex-direction: column;
  }

  @media all and (max-width: 480px) {
    flex-direction: column;
  }
`;

export const FilterItems = styled(Space)`
  width: 100%;
  vertical-align: middle;
  margin: 1px;
  .ant-space-item {
    width: 100%;
  }
`;

export const DataTableWrapper = styled(Table)`
  min-width: 1000px;

  .ant-table-content {
    overflow-x: auto;
    min-width: 1000px;
  }
  .ant-table-cell {
    background-color: #fff;
  }
`;

export const MainContentWrapper = styled.div`
  box-sizing: border-box;
  margin: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  padding: 16px 24px;
  overflow-x: auto;
`;
