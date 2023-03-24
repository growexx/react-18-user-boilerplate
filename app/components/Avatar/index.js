/* eslint-disable react/no-array-index-key */
/**
 * Avatar/index.js
 *
 * This is the Avatar Component file.
 */
import React from 'react';
import { Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AvatarWrapper } from './StyledAvatar';

const getMenu = MenuItems => (
  <Menu>
    {MenuItems.map((menuItem, index) => (
      <Menu.Item key={index} icon={menuItem.icon}>
        <Link to={menuItem.to}>{menuItem.tabName}</Link>
      </Menu.Item>
    ))}
  </Menu>
);
const Avatar = props => (
  <AvatarWrapper>
    <Dropdown.Button
      overlay={getMenu(props.menu)}
      placement="bottomCenter"
      icon={<UserOutlined />}
    />
  </AvatarWrapper>
);

export default Avatar;

Avatar.propTypes = {
  menu: PropTypes.array,
};
