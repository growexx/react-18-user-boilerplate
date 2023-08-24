/**
 *
 * RichTextEditor
 *
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { StyledEditor } from './StyledEditor';

function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);

  return (
    <StyledEditor>
      <Editor
        ref={editorRef}
        editorState={value}
        onEditorStateChange={onChange}
      />
    </StyledEditor>
  );
}

RichTextEditor.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
};

export default RichTextEditor;
