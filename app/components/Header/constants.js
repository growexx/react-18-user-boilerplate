/*
 * Header Constants
 * This file contains constants used in Header component.
 */
import React from 'react';
import {
  UserOutlined,
  LockOutlined,
  QuestionOutlined,
} from '@ant-design/icons';
import { ROUTES } from 'containers/constants';

export const MenuItems = [
  {
    to: ROUTES.PROFILE,
    tabName: 'Profile',
    icon: <UserOutlined />,
  },
  {
    to: ROUTES.CHANGE_PASSWORD,
    tabName: 'Change Password',
    icon: <UserOutlined />,
  },
  {
    to: ROUTES.REGISTER_QUESTION,
    tabName: ' Set Security Question',
    icon: <QuestionOutlined />,
  },
  {
    to: ROUTES.LOGOUT,
    tabName: 'Logout',
    icon: <LockOutlined />,
  },
];
