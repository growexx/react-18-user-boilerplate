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

const RichTextEditor = props => {
  const setEditor = React.useRef(null);
  return (
    <StyledEditor>
      <Editor
        ref={setEditor}
        editorState={props.value}
        onEditorStateChange={props.onChange}
      />
    </StyledEditor>
  );
};

RichTextEditor.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
};

export default RichTextEditor;
