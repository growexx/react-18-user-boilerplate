/**
 *
 * ImageUpload
 *
 */

import React, { useCallback, useState } from 'react';
import { Modal, Slider, Upload, notification } from 'antd';
import Cropper from 'react-easy-crop';
import getCroppedImg from './util/crop';

function ImageUpload() {
  const [fileList, setFileList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [photoURL, setPhotoURL] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleModalClose = () => {
    const files = [...fileList];
    files.pop();
    setFileList(files);
    setIsModalOpen(false);
    setZoom(1);
    setRotation(0);
  };

  const beforeUpload = file => {
    setPhotoURL(URL.createObjectURL(file));
    return false;
  };

  const onChange = ({ file, fileList: newFileList }) => {
    const files = [...newFileList];

    if (file?.status !== 'removed') {
      setIsModalOpen(true);
      files[files.length - 1].thumbUrl = '';
    }
    setFileList(files);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageCrop = async () => {
    try {
      const files = [...fileList];
      const fileIndex = files.length - 1;
      const croppedImage = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation,
        files[fileIndex].type,
      );
      const file = new File([croppedImage], files[fileIndex].name, {
        type: files[fileIndex].type,
      });

      files[fileIndex].originFileObj = file;
      files[fileIndex].size = file.size;
      files[fileIndex].thumbUrl = croppedImage;

      setFileList(files);
    } catch (err) {
      notification.error({
        message:
          'There was an error while cropping the image. Please try again!',
      });
      const files = [...fileList];
      files.pop();
      setFileList(files);
    } finally {
      setIsModalOpen(false);
      setZoom(1);
      setRotation(0);
    }
  };

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        beforeUpload={beforeUpload}
        maxCount={4}
      >
        {fileList.length < 4 && '+ Upload'}
      </Upload>
      <Modal
        title="Crop Image"
        centered
        maskClosable={false}
        open={isModalOpen}
        onCancel={handleModalClose}
        onOk={handleImageCrop}
        className="imageCropModal"
      >
        <>
          <div className="cropperContainer">
            <Cropper
              image={photoURL}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="sliderContainer">
            <div className="slider">
              <p>Zoom</p>
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={e => setZoom(e)}
              />
            </div>
            <div className="slider">
              <p>Rotation</p>
              <Slider
                min={0}
                max={360}
                value={rotation}
                onChange={e => setRotation(e)}
              />
            </div>
          </div>
        </>
      </Modal>
    </>
  );
}

export default ImageUpload;
