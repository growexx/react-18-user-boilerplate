/**
 * SideBar/index.js
 *
 * This is the SideBar Component File.
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import { ROUTES } from 'containers/constants';
import { showLogoInSideBar } from 'components/constants';
import GrowExxTriangleLogo from '../../images/Growexx-Triangle-White.png';
import GrowExxLogo from '../../images/GrowExx_Group_Logo.png';
import { GA_LABEL_SIDEBAR, GET_FILTERED_MENU_ITEM } from './constants';
import { eventGA } from '../../utils/googleAnalytics';
import { GA_CATEGORY_MENU_CLICKS } from '../../utils/constants';

const { Sider } = Layout;

const SideBar = props => {
  const location = useLocation();

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
        defaultSelectedKeys={[location.pathname]}
        selectedKeys={[location.pathname]}
      >
        {GET_FILTERED_MENU_ITEM(props.user && props.user.role).map(menu => (
          <Menu.Item
            key={menu.to}
            icon={menu.icon}
            onClick={() => {
              eventGA(
                GA_CATEGORY_MENU_CLICKS,
                `${menu.to} clicked from sidebar`,
                GA_LABEL_SIDEBAR,
              );
            }}
          >
            <Link to={menu.to}>{menu.tabName}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideBar;

SideBar.propTypes = {
  collapsed: PropTypes.bool,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  layoutVariant: PropTypes.number,
};
