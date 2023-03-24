export const CREATE_COLUMNS = [
  {
    title: 'Input',
    dataIndex: 'input',
    key: 'input',
    width: 200,
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    width: 150,
  },
];
export const FORMAT_COLUMNS = [
  {
    title: 'Number',
    dataIndex: 'number',
    key: 'number',
    width: 100,
  },
  {
    title: 'Format',
    dataIndex: 'format',
    key: 'format',
    width: 100,
  },
  {
    title: 'String',
    dataIndex: 'string',
    key: 'string',
    width: 100,
  },
];

export const NUMBERS_FORMAT = [
  '0,0.0000',
  '0,0',
  '+0,0',
  '0,0.0',
  '0.000',
  '00000',
  '000000,0',
  '0o',
  '0o',
  '0a',
  '0 a',
  '0.0a',
  '0.0[0000]',
  '0.00000',
  '(.00)',
  '.00',
  '(0,0.0000)',
  '0[.]00000',
  '000.00',
];

export const CURRENCY_FORMAT = [
  '$0,0.00',
  '0,0[.]00 $',
  '$ 0,0[.]00',
  '($0,0)',
  '$0.00',
  '($ 0.00 a)',
];

export const BYTES_FORMAT = [
  '0b',
  '0b',
  '0 ib',
  '0.0 b',
  '0.00b',
  '0.00b',
  '0.000 ib',
];

export const PERCENTAGES_FORMAT = ['0%', '0.000%', '0 %', '(0.000 %)'];

export const TIME_FORMAT = ['00:00:00', '00:00:00', '00:00:00'];

export const EXPONENTIAL_FORMAT = ['0,0e+0', '0.00e+0', '0.000e+0'];
