/**
 *
 * Tests for ImageUpload
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import userEvent from '@testing-library/user-event';
import ImageUpload from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';
import getCroppedImg from '../util/crop';
import image from './test.jpg';

jest.mock('../util/crop');

const imageObjectUrl = 'https://picsum.photos/1000';
const uploadFile = async (file, container) => {
  const fileInput = container.querySelector('input');

  await userEvent.upload(fileInput, file);
  return fileInput;
};

global.URL.createObjectURL = jest.fn().mockImplementation(() => imageObjectUrl);

describe('<ImageUpload />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ImageUpload />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should handle image crop modal close', async () => {
    const { container, getByText } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ImageUpload />
      </IntlProvider>,
    );
    const file = new File([image], 'test.png', {
      type: 'image/png',
      lastModified: Date.now(),
    });

    await uploadFile(file, container);
    expect(document.querySelectorAll('.ant-modal-mask')).toHaveLength(1);

    await act(async () => {
      fireEvent.click(getByText('Cancel'));
    });
    expect(document.querySelectorAll('.ant-modal-mask')).toHaveLength(0);
  });

  it('should change image zoom and rotation', async () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ImageUpload />
      </IntlProvider>,
    );
    const file = new File([image], 'test.png', {
      type: 'image/png',
      lastModified: Date.now(),
    });

    await uploadFile(file, container);

    const zoomHandle = document.querySelectorAll('.ant-slider-handle')[0];
    const rotationHandle = document.querySelectorAll('.ant-slider-handle')[1];

    fireEvent.focus(zoomHandle);
    fireEvent.keyDown(zoomHandle, {
      key: 'ArrowRight',
      code: 'ArrowRight',
      keyCode: 39,
      charCode: 39,
    });

    fireEvent.focus(rotationHandle);
    fireEvent.keyDown(rotationHandle, {
      key: 'ArrowRight',
      code: 'ArrowRight',
      keyCode: 39,
      charCode: 39,
    });

    expect(zoomHandle.getAttribute('aria-valuenow')).not.toBe(
      zoomHandle.getAttribute('aria-valuemin'),
    );
    expect(rotationHandle.getAttribute('aria-valuenow')).not.toBe(
      rotationHandle.getAttribute('aria-valuemin'),
    );
  });

  it('should handle image crop', async () => {
    getCroppedImg.mockImplementation(() => Promise.resolve(imageObjectUrl));
    const { container, getByText } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ImageUpload />
      </IntlProvider>,
    );
    const file = new File([image], 'test.png', {
      type: 'image/png',
      lastModified: Date.now(),
    });

    await uploadFile(file, container);
    expect(document.querySelectorAll('.ant-modal-mask')).toHaveLength(1);

    await act(async () => {
      fireEvent.click(getByText('OK'));
    });
    expect(document.querySelectorAll('.ant-modal-mask')).toHaveLength(0);
  });
});
