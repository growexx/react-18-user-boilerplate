/**
 *
 * RichTextEditor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { StyledEditor } from './StyledEditor';

class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.setEditor = editor => {
      this.editor = editor;
    };
  }

  render() {
    return (
      <StyledEditor>
        <Editor
          ref={this.setEditor}
          editorState={this.props.value}
          onEditorStateChange={this.props.onChange}
        />
      </StyledEditor>
    );
  }
}

RichTextEditor.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
};

export default RichTextEditor;
