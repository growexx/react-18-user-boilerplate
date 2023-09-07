/**
 *
 * FileUpload.stories.js
 *
 */
import React from 'react';
import FileUpload from '../index';

export default {
  title: 'Components/FileUpload',
  component: FileUpload,
};
function Template(args) {
  return <FileUpload {...args} />;
}

export const FileUploadComponent = Template.bind({});
FileUploadComponent.args = {};

FileUploadComponent.storyName = 'FileUpload';
