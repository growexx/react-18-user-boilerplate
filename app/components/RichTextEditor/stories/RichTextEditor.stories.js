/**
 *
 * RichTextEditor.stories.js
 *
 */
import React from 'react';
import { EditorState } from 'draft-js';
import RichTextEditor from '../index';

let stateValue = EditorState.createEmpty();
export default {
  title: 'Components/RichTextEditor',
  component: RichTextEditor,
};
const Template = args => <RichTextEditor {...args} />;

export const RichTextEditorComponent = Template.bind({});
RichTextEditorComponent.args = {
  value: stateValue,
  onChange: argValue => {
    stateValue = argValue;
  },
};

RichTextEditorComponent.storyName = 'RichTextEditor';
