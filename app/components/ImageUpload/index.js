/**
 *
 * ImageUpload
 *
 */

import React from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import { API_ENDPOINTS } from 'containers/constants';

const ImageUpload = () => {
  const [state, setState] = React.useState({
    fileList: [],
  });

  const onChange = ({ fileList: newFileList }) => {
    setState({
      fileList: newFileList,
    });
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  return (
    <ImgCrop rotate>
      <Upload
        action={API_ENDPOINTS.IMAGE_UPLOAD}
        listType="picture-card"
        fileList={state.fileList}
        onChange={onChange}
        onPreview={onPreview}
        maxCount={1}
      >
        {state.fileList.length < 1 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

ImageUpload.propTypes = {};

export default ImageUpload;
