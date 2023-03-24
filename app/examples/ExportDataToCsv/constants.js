export const CSV_FILE_NAME = 'demo.csv';
export const TABLE_DATA = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

export const TABLE_COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: text => text,
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

export const FIELDS_FOR_CSV = {
  fields: [
    { label: 'Name', value: 'name' },
    { label: 'Address', value: 'address' },
    { label: 'Age', value: 'age' },
  ],
  header: true,
};
