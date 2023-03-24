/*
 * NumeralConversion Messages
 *
 * This contains all the text for the NumeralConversion container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NumeralConversion';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This demo uses numeral library for conversion of number',
  },
  createHeader: {
    id: `${scope}.createHeader`,
    defaultMessage: 'Create',
  },
  createMessage: {
    id: `${scope}.createMessage`,
    defaultMessage:
      'Create an instance of a numeral. Numeral takes numbers or strings that it trys to convert into a number.',
  },
  formatHeader: {
    id: `${scope}.format`,
    defaultMessage: 'Format',
  },
  formatMessage: {
    id: `${scope}.formatMessage`,
    defaultMessage:
      'Numbers can be formatted to look like currency, percentages, times, or even plain old numbers with decimal places, thousands, and abbreviations.',
  },
  number: {
    id: `${scope}.number`,
    defaultMessage: 'Numbers',
  },
  currency: {
    id: `${scope}.currency`,
    defaultMessage: 'Currency',
  },
  bytes: {
    id: `${scope}.bytes`,
    defaultMessage: 'Bytes',
  },
  percentages: {
    id: `${scope}.percentages`,
    defaultMessage: 'Percentages',
  },
  time: {
    id: `${scope}.time`,
    defaultMessage: 'Time',
  },
  exponential: {
    id: `${scope}.exponential`,
    defaultMessage: 'Exponential',
  },
});
