/*
 * Sidebar Constants
 * This file contains constants used in Sidebar component.
 */

import React from 'react';
import {
  UserOutlined,
  SmileOutlined,
  LoadingOutlined,
  ExportOutlined,
  NumberOutlined,
  FormOutlined,
  LockOutlined,
  PieChartOutlined,
  MessageOutlined,
  ShoppingOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  ROUTES,
  ROLE_BASED_SIDEBAR_MENU,
  ROLES,
  RESTRICTED_ROUTES,
} from 'containers/constants';

export const MenuItems = [
  {
    to: ROUTES.HOME,
    tabName: 'Home',
    icon: <SmileOutlined />,
  },
  {
    to: ROUTES.SAMPLE_FORM,
    tabName: 'Redux-Saga Form',
    icon: <FormOutlined />,
  },
  {
    to: ROUTES.LOADER,
    tabName: 'Loader Demo',
    icon: <LoadingOutlined />,
  },
  {
    to: ROUTES.EXPORT_DATA,
    tabName: 'Export Data To CSV',
    icon: <ExportOutlined />,
  },
  {
    to: ROUTES.NUMERAL_CONVERTER,
    tabName: 'Number Conversion Demo',
    icon: <NumberOutlined />,
  },
  {
    to: ROUTES.USERS,
    tabName: 'User Management',
    icon: <UserOutlined />,
  },
  {
    to: ROUTES.GITHUB_SEARCH,
    tabName: 'Github Search',
    icon: <SearchOutlined />,
  },
  {
    to: ROUTES.TEST_ADMIN_PAGE,
    tabName: 'Admin Page',
    icon: <LockOutlined />,
  },
  {
    to: ROUTES.CHARTS,
    tabName: 'Charts',
    icon: <PieChartOutlined />,
  },
  {
    to: ROUTES.MULTI_TAB_SUPPORT,
    tabName: 'Multi Tab Communication',
    icon: <MessageOutlined />,
  },
  {
    to: ROUTES.PRODUCTS,
    tabName: 'Products',
    icon: <ShoppingOutlined />,
  },
];

/**
 * Filters Sidebar menu based on role
 * @param {string} role
 */
export const GET_FILTERED_MENU_ITEM = role =>
  MenuItems.filter(item =>
    // Check if route is private then role has access to it
    RESTRICTED_ROUTES.includes(item.to)
      ? ROLE_BASED_SIDEBAR_MENU[role || ROLES.USER].includes(item.to)
      : true,
  );
