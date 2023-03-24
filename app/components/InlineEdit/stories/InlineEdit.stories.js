/**
 *
 * InlineEdit.stories.js
 *
 */
import React from 'react';
import InlineEdit from '../index';

export default {
  title: 'Components/InlineEdit',
  component: InlineEdit,
};
const Template = args => <InlineEdit {...args} />;

export const InlineEditComponent = Template.bind({});
InlineEditComponent.args = {
  value: 'John Doe',
  onSave: () => {},
  placeholder: 'Enter Value',
};

InlineEditComponent.storyName = 'InlineEdit';
