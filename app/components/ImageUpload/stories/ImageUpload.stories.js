/**
 *
 * ImageUpload.stories.js
 *
 */
import React from 'react';
import ImageUpload from '../index';

export default {
  title: 'Components/ImageUpload',
  component: ImageUpload,
};
function Template(args) {
  return <ImageUpload {...args} />;
}

export const ImageEditorComponent = Template.bind({});
ImageEditorComponent.args = {};

ImageEditorComponent.storyName = 'ImageUpload';
