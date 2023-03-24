/**
 * SideBar/index.js
 *
 * This is the SideBar Component File.
 */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import { ROUTES } from 'containers/constants';
import { showLogoInSideBar } from 'components/constants';
import GrowExxTriangleLogo from '../../images/Growexx-Triangle-White.png';
import GrowExxLogo from '../../images/GrowExx_Group_Logo.png';
import { GET_FILTERED_MENU_ITEM } from './constants';

const { Sider } = Layout;

const SideBar = props => {
  const Logo = !props.collapsed ? (
    <img src={GrowExxLogo} alt="logo" />
  ) : (
    <img src={GrowExxTriangleLogo} alt="logo" />
  );
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      id="components-layout-demo-custom-trigger"
    >
      {showLogoInSideBar(props.layoutVariant) ? (
        <div className="logo">
          <Link to={ROUTES.HOME}>{Logo}</Link>
        </div>
      ) : null}
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[props.location.pathname]}
        selectedKeys={[props.location.pathname]}
      >
        {GET_FILTERED_MENU_ITEM(props.user && props.user.role).map(menu => (
          <Menu.Item key={menu.to} icon={menu.icon}>
            <Link to={menu.to}>{menu.tabName}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default withRouter(SideBar);

SideBar.propTypes = {
  collapsed: PropTypes.bool,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  location: PropTypes.object.isRequired,
  layoutVariant: PropTypes.number,
};
