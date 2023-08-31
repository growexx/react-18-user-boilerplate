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
import { StyledDraft } from './StyledDraft';

function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);

  return (
    <StyledEditor>
      <StyledDraft>
        <Editor
          ref={editorRef}
          editorState={value}
          onEditorStateChange={onChange}
        />
      </StyledDraft>
    </StyledEditor>
  );
}

RichTextEditor.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
};

export default RichTextEditor;
