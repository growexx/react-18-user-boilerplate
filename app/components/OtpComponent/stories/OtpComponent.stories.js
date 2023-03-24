/**
 *
 * Otp.stories.js
 *
 */
import React from 'react';
import Otp from '../index';

export default {
  title: 'Components/Otp',
  component: Otp,
};
const Template = args => <Otp {...args} />;

export const OtpComponent = Template.bind({});
OtpComponent.args = {};

OtpComponent.storyName = 'OtpComponent';
