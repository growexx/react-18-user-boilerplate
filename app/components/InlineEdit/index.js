/**
 *
 * InlineEdit
 *
 */

import React, { memo, useState, useEffect, useRef } from 'react';
import { Input, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { ESC_KEY_CODE } from 'components/InlineEdit/constants';
import { StyledInlineInput } from 'components/InlineEdit/StyledInlineInput';
import { TEST_IDS } from 'components/InlineEdit/stub';

function InlineEdit ({ value, onSave, placeholder }) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputContainerRef = useRef(null);

  const handleOutSide = e => {
    if (
      inputContainerRef &&
      inputContainerRef.current &&
      inputContainerRef.current.contains(e.target)
    ) {
      return;
    }
    if (isInputActive) {
      handleSave();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutSide);
    document.addEventListener('touchstart', handleOutSide);

    return () => {
      document.removeEventListener('mousedown', handleOutSide);
      document.removeEventListener('touchstart', handleOutSide);
    };
  }, []);

  const handleSave = () => {
    onSave(inputValue);
    setIsInputActive(false);
  }

  const onCancel = () => {
    setInputValue(value);
    setIsInputActive(false);
  };

  const handleKeyDown = e => {
    if (e.keyCode === ESC_KEY_CODE) {
      onCancel();
    }
  };

  const handleOnChange = e => {
    setInputValue(e.target.value);
  };

  const handleDoubleClick = () => {
    setIsInputActive(true);
  };

  const saveIcon = () => (
    <Button type="link">
      <FontAwesomeIcon
        icon={faCheck}
        onClick={handleSave}
        data-testid={TEST_IDS.SAVE_BUTTON}
        title={TEST_IDS.SAVE_BUTTON}
      />
    </Button>
  );

  const cancelIcon = () => (
    <Button type="link">
      <FontAwesomeIcon
        icon={faTimes}
        onClick={onCancel}
        data-testid={TEST_IDS.CANCEL_BUTTON}
        title={TEST_IDS.CANCEL_BUTTON}
      />
    </Button>
  );

  const addonAfterView = () => (
    <span>
      {saveIcon()}
      {cancelIcon()}
    </span>
  );

  const getValue = () => {
    if (value.length > 0) {
      return value;
    }
    return <span className="placeHolderView">{placeholder}</span>;
  };

  return (
    <StyledInlineInput ref={inputContainerRef}>
      {!isInputActive ? (
        <div
          data-testid={TEST_IDS.INPUT_VALUE}
          onDoubleClick={handleDoubleClick}
          className="inputValue"
        >
          {getValue()}
        </div>
      ) : (
        <Input
          placeholder={placeholder}
          suffix={addonAfterView()}
          value={inputValue}
          onChange={handleOnChange}
          allowClear
          onPressEnter={handleSave}
          onKeyDown={handleKeyDown}
          data-testid={TEST_IDS.INPUT_EDIT}
        />
      )}
    </StyledInlineInput>
  );
  
}

InlineEdit.propTypes = {
  value: PropTypes.string,
  onSave: PropTypes.func,
  placeholder: PropTypes.string,
};

export default memo(InlineEdit);
