/**
 *
 * Tests for ImageUpload
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, fireEvent, act, wait } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { IntlProvider } from 'react-intl';
import ImageUpload from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';
jest.mock('antd-img-crop', () => {
  const ComponentToMock = Children => <div>{Children.children}</div>;
  return ComponentToMock;
});
describe('<ImageUpload />', () => {
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
  it('Should onchange the file upload', async () => {
    global.URL.createObjectURL = jest.fn();
    global.Image = jest.fn().mockImplementation(() => ({}));
    global.open = jest.fn().mockImplementation(() => ({
      document: {
        write: jest.fn(),
      },
    }));
    HTMLCanvasElement.prototype.getContext = () => jest.fn();
    const { container, getByTitle } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ImageUpload />
      </IntlProvider>,
    );
    const file = new File(['(⌐□_□)'], 'test.png', {
      type: 'image/png',
      lastModified: Date.now(),
    });
    const hiddenFileInput = container.querySelector('input');
    await act(async () => {
      fireEvent.change(hiddenFileInput, { target: { files: [file] } });
    });
    await wait(async () => {
      expect(container.querySelector('a')).toBeInTheDocument();
    });
    fireEvent.click(getByTitle('Preview file'));
    expect(hiddenFileInput.files[0]).toStrictEqual(file);
  });
});
