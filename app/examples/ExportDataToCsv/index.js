/**
 *
 * ExportDataToCsv
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, Table } from 'antd';
import { FormattedMessage } from 'react-intl';
import { exportJsonAsCSV } from 'utils/csvExport';
import { StyledButton, StyledExport } from './StyledExport';
import {
  CSV_FILE_NAME,
  FIELDS_FOR_CSV,
  TABLE_COLUMNS,
  TABLE_DATA,
} from './constants';
import messages from './messages';
class ExportDataToCsv extends React.Component {
  state = {
    selectedRows: [],
  };

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // eslint-disable-next-line no-console
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
      this.setState({
        selectedRows,
      });
    },
  };

  /**
   * export data client side
   */
  exportDataClientSide = () => {
    exportJsonAsCSV(this.state.selectedRows, FIELDS_FOR_CSV, CSV_FILE_NAME);
  };

  /**
   * export data server side
   * exportDataServerSide = () => {
    const payload = {
      data: this.state.selectedRows,
      fields: FIELDS_FOR_CSV,
    };
    request(API_ENDPOINTS.EXPORT_CSV, payload).then(res => {
      const downloadLink = document.createElement('a');
      downloadLink.href = res.url;
      downloadLink.download = CSV_FILE_NAME;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  };
  */

  render() {
    return (
      <div>
        <Helmet>
          <title>ExportDataToCsv</title>
          <meta name="description" content="Description of ExportDataToCsv" />
        </Helmet>
        <StyledExport>
          <StyledButton>
            <Button
              data-testid="ExportButton"
              type="primary"
              onClick={this.exportDataClientSide}
              disabled={this.state.selectedRows.length === 0}
            >
              <FormattedMessage {...messages.exportData} />
            </Button>
          </StyledButton>
          <Table
            scroll={{ x: 350 }}
            data-testid="DataTable"
            pagination={false}
            rowSelection={{
              type: 'checkbox',
              ...this.rowSelection,
            }}
            columns={TABLE_COLUMNS}
            dataSource={TABLE_DATA}
          />
        </StyledExport>
      </div>
    );
  }
}

export default ExportDataToCsv;
