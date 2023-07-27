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
const ExportDataToCsv = () => {
  const [selectedRowsState, setSelectedRows] = React.useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
  };

  /**
   * export data client side
   */
  const exportDataClientSide = () => {
    exportJsonAsCSV(selectedRowsState, FIELDS_FOR_CSV, CSV_FILE_NAME);
  };

  /**
   * export data server side
   * exportDataServerSide = () => {
    const payload = {
      data: selectedRowsState,
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
            onClick={exportDataClientSide}
            disabled={selectedRowsState.length === 0}
          >
            <FormattedMessage {...messages.exportData} />
          </Button>
        </StyledButton>
        <Table
          data-testid="DataTable"
          pagination={false}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={TABLE_COLUMNS}
          dataSource={TABLE_DATA}
        />
      </StyledExport>
    </div>
  );
};

export default ExportDataToCsv;
