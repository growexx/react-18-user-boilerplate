import React from 'react';
import Footer from '../index';

export default {
  title: 'Components/Footer',
  component: Footer,
};

function Template(args) {
  return <Footer {...args} />;
}

export const FooterComponent = Template.bind({});
FooterComponent.args = {};

FooterComponent.storyName = 'Footer';
