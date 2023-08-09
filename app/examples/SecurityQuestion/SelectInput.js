import React from 'react';
import { Select, Input } from 'antd';
import PropTypes from 'prop-types';
import { StyledSelectInput } from './StylesSelectInput';
const { Option } = Select;
function SelectInput(props) {
  const {
    defaultValue,
    onSelectChange,
    selectOptions = [],
    selectName,
    placeholder,
    onChange,
    inputName,
    value,
    disabled,
    dataTestid,
    dataTestIdAnswer,
  } = props;

  const renderOption = () =>
    selectOptions.length > 0 &&
    selectOptions.map(option => {
      if (option.isVisible !== undefined && !option.isVisible) {
        return null;
      }
      return (
        <Option key={option.id} value={option.value}>
          {option.name}
        </Option>
      );
    });
  const renderSelectWithValue = () => (
    <Select
      defaultValue={defaultValue}
      className="input-select"
      onChange={onSelectChange}
      name={selectName}
      value={value}
      disabled={disabled}
      data-testid={dataTestid}
    >
      {renderOption()}
    </Select>
  );

  const renderSelectWithoutValue = () => (
    <Select
      defaultValue={defaultValue}
      className="input-select"
      onChange={onSelectChange}
      name={selectName}
      disabled={disabled}
      data-testid={dataTestid}
    >
      {renderOption()}
    </Select>
  );
  return (
    <StyledSelectInput>
      {value ? renderSelectWithValue() : renderSelectWithoutValue()}
      <Input
        className="answer"
        placeholder={placeholder}
        onChange={onChange}
        name={inputName}
        data-testid={dataTestIdAnswer}
      />
    </StyledSelectInput>
  );
}
SelectInput.propTypes = {
  defaultValue: PropTypes.string,
  onSelectChange: PropTypes.func,
  selectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  selectName: PropTypes.string,
  inputName: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  dataTestid: PropTypes.string,
  dataTestIdAnswer: PropTypes.string,
};
export default SelectInput;
