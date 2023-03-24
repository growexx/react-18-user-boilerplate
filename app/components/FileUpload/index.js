/**
 *
 * FileUpload
 *
 */

import React from 'react';
import { Upload /* message */ } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { API_ENDPOINTS } from 'containers/constants';
import formattedMessages from './messages';
const { Dragger } = Upload;

const props = {
  name: 'file',
  action: API_ENDPOINTS.IMAGE_UPLOAD,
  onChange(/* info */) {
    /*
     * NOTE : CODE FOR ACTUAL FILE UPLOAD WITH API
      const { status } = info.file;
      if (status !== 'uploading') {
      // eslint-disable-next-line no-console
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(
        <FormattedMessage
          {...formattedMessages.uploadSuccess}
          values={{
            filename: info.file.name,
          }}
        />,
      );
    } else if (status === 'error') {
      message.error(
        <FormattedMessage
          {...formattedMessages.uploadError}
          values={{
            filename: info.file.name,
          }}
        />,
      );
    }
     */
  },
};

function FileUpload() {
  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        <FormattedMessage {...formattedMessages.uploadComponentMessage} />
      </p>
    </Dragger>
  );
}

FileUpload.propTypes = {};

export default FileUpload;
