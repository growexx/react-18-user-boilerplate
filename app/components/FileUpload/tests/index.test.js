/**
 *
 * Tests for FileUpload
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import user from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import FileUpload from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<FileUpload />', () => {
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <FileUpload />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
  it('Should onchange the file upload', async () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <FileUpload />
      </IntlProvider>,
    );
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    const hiddenFileInput = container.querySelector('input');
    user.upload(hiddenFileInput, file);
    // Another way of testing it.
    // await act(async () => {
    //   fireEvent.change(hiddenFileInput, { target: { files: [file] } });
    // });
    expect(hiddenFileInput.files[0]).toStrictEqual(file);
  });
});
