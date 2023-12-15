/* eslint-disable react/prop-types */
import { Select } from 'antd';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

export default forwardRef((props, ref) => {
  const query = new URLSearchParams(window.location.search);
  const [currentValue, setCurrentValue] = useState(query.get(props.field));
  const [options, setOptions] = useState(props.selectOptions);

  useEffect(() => {
    setOptions(props.selectOptions);
  }, [props.selectOptions]);

  useImperativeHandle(ref, () => ({
    onParentModelChanged(parentModel) {
      if (!parentModel) {
        setCurrentValue(null);
      } else {
        setCurrentValue(parentModel.filter);
      }
    },
  }));

  const onCustomFilterSelect = value => {
    setCurrentValue(value);
    if (value === undefined) {
      props.parentFilterInstance(instance => {
        instance.onFloatingFilterChanged(null, null);
      });
    } else {
      props.parentFilterInstance(instance => {
        instance.onFloatingFilterChanged('', value);
      });
    }
  };

  return (
    <div>
      <Select
        options={options}
        showSearch
        allowClear
        style={{ width: '100%' }}
        onChange={onCustomFilterSelect}
        filterOption={(input, option) =>
          option && option.text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        value={currentValue}
      />
    </div>
  );
});
