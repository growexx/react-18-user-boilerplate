import styled from 'styled-components';
export const StyledMainLayout = styled.div`
  .ant-layout-sider {
    transition: none;
    background: #190426;
  }
  .ant-menu .ant-menu-item,
  .ant-menu-submenu-title,
  .ant-menu {
    transition: none;
  }
  .ant-menu.ant-menu-dark,
  .ant-menu-dark .ant-menu-sub,
  .ant-menu.ant-menu-dark .ant-menu-sub {
    background-color: #190426;
    color: @secondary-color;
  }
  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
    .ant-menu-item-selected {
    background-color: @primary-color;
    color: @white;
  }
  .ant-menu-dark .ant-menu-item,
  .ant-menu-dark .ant-menu-item-group-title,
  .ant-menu-dark .ant-menu-item > a,
  .ant-menu-dark .ant-menu-item > span > a {
    color: @white;
  }
  .ant-menu-item-selected > span > a {
    color: @white !important;
  }
  .sideBarTrigger {
    padding: 0 @padding-lg;
    font-size: @font-size-base+4px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
    outline: none;
  }
  .sideBarTrigger:hover {
    color: @primary-color;
  }
  #components-layout-demo-custom-trigger .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      margin: @margin-md;
    }
  }
  .site-layout .site-layout-background {
    background: #fff;
  }
  .headerLayout {
    display: flex;
    padding: 0;
    background-color: @white;
  }
  &[data-environment] {
    &:before {
      content: attr(data-environment);
      background: #ff8c1e;
      height: 25px;
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 200;
      color: #fff;
      text-align: center;
      text-transform: uppercase;
    }

    > .ant-layout {
      position: relative;
      top: 25px;
    }
  }

  &[data-environment='development'] {
    &:before {
      background: #b6c5cd;
    }
  }
`;

export const ToggleBreadCrumb = styled.div`
  display: flex;
`;
