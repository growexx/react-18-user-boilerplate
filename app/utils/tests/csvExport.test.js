import {
  CSV_FILE_NAME,
  FIELDS_FOR_CSV,
} from 'examples/ExportDataToCsv/constants';
import { exportJsonAsCSV } from 'utils/csvExport';
global.URL.createObjectURL = jest.fn();
describe('Export Data', () => {
  test('should return csv file', () => {
    expect(
      exportJsonAsCSV(
        [
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
        ],
        FIELDS_FOR_CSV,
        CSV_FILE_NAME,
      ),
    ).toBe();
  });
});
