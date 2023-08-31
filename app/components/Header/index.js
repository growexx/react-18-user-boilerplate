/* eslint-disable react/no-array-index-key */
/**
 * Avatar/index.js
 *
 * This is the Avatar Component File.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Notification from 'components/Notification';
import Cart from 'components/Cart';
import { MenuItems } from './constants';
import {
  StyledAppHeader,
  AvatarWrapper,
  StyledAppHeaderColored,
} from './StyledAppHeader';
import Avatar from '../Avatar';

function Header(props) {
  return props.menuBackground ? (
    <StyledAppHeaderColored {...props}>
      <AvatarWrapper>
        <Cart />
        <Notification />
        <Avatar menu={MenuItems} />
      </AvatarWrapper>
    </StyledAppHeaderColored>
  ) : (
    <StyledAppHeader {...props}>
      <AvatarWrapper>
        <Cart />
        <Notification />
        <Avatar menu={MenuItems} />
      </AvatarWrapper>
    </StyledAppHeader>
  );
}

Header.propTypes = {
  menuBackground: PropTypes.bool,
};
export default Header;
