/**
 *
 * InlineEdit
 *
 */

import React, { memo, createRef } from 'react';
import { Input, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { ESC_KEY_CODE } from 'components/InlineEdit/constants';
import { StyledInlineInput } from 'components/InlineEdit/StyledInlineInput';
import { TEST_IDS } from 'components/InlineEdit/stub';
class InlineEdit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isInputActive: false,
      inputValue: props.value,
    };
    this.inputContainerRef = createRef(null);
  }

  handleOutSide = e => {
    const { isInputActive } = this.state;
    if (
      this.inputContainerRef &&
      this.inputContainerRef.current &&
      this.inputContainerRef.current.contains(e.target)
    ) {
      return;
    }
    if (isInputActive) {
      this.onSave();
    }
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutSide);
    document.addEventListener('touchstart', this.handleOutSide);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutSide);
    document.removeEventListener('touchstart', this.handleOutSide);
  }

  onSave = () => {
    const { inputValue } = this.state;
    const { onSave } = this.props;
    onSave(inputValue);
    this.setState({
      isInputActive: false,
    });
  };

  onCancel = () => {
    const { value } = this.props;
    this.setState({
      inputValue: value,
      isInputActive: false,
    });
  };

  handleKeyDown = e => {
    if (e.keyCode === ESC_KEY_CODE) {
      this.onCancel();
    }
  };

  handleOnChange = e => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  handleDoubleClick = () => {
    this.setState({
      isInputActive: true,
    });
  };

  saveIcon = () => (
    <Button type="link">
      <FontAwesomeIcon
        icon={faCheck}
        onClick={this.onSave}
        data-testid={TEST_IDS.SAVE_BUTTON}
        title={TEST_IDS.SAVE_BUTTON}
      />
    </Button>
  );

  cancelIcon = () => (
    <Button type="link">
      <FontAwesomeIcon
        icon={faTimes}
        onClick={this.onCancel}
        data-testid={TEST_IDS.CANCEL_BUTTON}
        title={TEST_IDS.CANCEL_BUTTON}
      />
    </Button>
  );

  addonAfterView = () => (
    <span>
      {this.saveIcon()}
      {this.cancelIcon()}
    </span>
  );

  getValue = () => {
    const { value, placeholder } = this.props;
    if (value.length > 0) {
      return value;
    }
    return <span className="placeHolderView">{placeholder}</span>;
  };

  render() {
    const { inputValue, isInputActive } = this.state;
    const { placeholder } = this.props;
    return (
      <StyledInlineInput ref={this.inputContainerRef}>
        {!isInputActive ? (
          <div
            data-testid={TEST_IDS.INPUT_VALUE}
            onDoubleClick={this.handleDoubleClick}
            className="inputValue"
          >
            {this.getValue()}
          </div>
        ) : (
          <Input
            placeholder={placeholder}
            suffix={this.addonAfterView()}
            value={inputValue}
            onChange={this.handleOnChange}
            allowClear
            onPressEnter={this.onSave}
            onKeyDown={this.handleKeyDown}
            data-testid={TEST_IDS.INPUT_EDIT}
          />
        )}
      </StyledInlineInput>
    );
  }
}

InlineEdit.propTypes = {
  value: PropTypes.string,
  onSave: PropTypes.func,
  placeholder: PropTypes.string,
};

export default memo(InlineEdit);
