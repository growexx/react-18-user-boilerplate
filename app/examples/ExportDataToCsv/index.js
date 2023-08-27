/**
 *
 * ExportDataToCsv
 *
 */

import React, { useState } from 'react';
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

function ExportDataToCsv() {
  const [selectedRows, setSelectedRows] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys, currentSelectedRows) => {
      // eslint-disable-next-line no-console
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        currentSelectedRows,
      );
      setSelectedRows(currentSelectedRows);
    },
  };

  /**
   * export data client side
   */
  const exportDataClientSide = () => {
    exportJsonAsCSV(selectedRows, FIELDS_FOR_CSV, CSV_FILE_NAME);
  };

  /**
   * export data server side
    const exportDataServerSide = () => {
      const payload = {
        data: selectedRows,
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
            disabled={selectedRows.length === 0}
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
            ...rowSelection,
          }}
          columns={TABLE_COLUMNS}
          dataSource={TABLE_DATA}
        />
      </StyledExport>
    </div>
  );
}

export default ExportDataToCsv;
