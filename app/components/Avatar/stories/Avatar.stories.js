import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import Avatar from '../index';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    menu: { control: {} },
  },
};

function Template(args) {
  return <Avatar {...args} />;
}

export const AvatarComponent = Template.bind({});
AvatarComponent.args = {
  menu: [
    {
      to: '/profile',
      tabName: 'Profile',
      icon: <UserOutlined />,
    },
  ],
};

AvatarComponent.storyName = 'Avatar';
