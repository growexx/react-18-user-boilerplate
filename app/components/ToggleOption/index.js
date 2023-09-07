/**
 *
 * ToggleOption
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

function ToggleOption({ value, message, intl }) {
  return (
    <option value={value}>
      {message ? intl.formatMessage(message) : value}
    </option>
  );
}

ToggleOption.propTypes = {
  value: PropTypes.string.isRequired,
  message: PropTypes.object,
  intl: PropTypes.any,
};

export default injectIntl(ToggleOption);
