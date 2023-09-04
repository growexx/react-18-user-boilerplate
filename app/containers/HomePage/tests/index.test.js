/**
 * Test the HomePage
 */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { store } from 'configureStore';
import { HomePage } from '../index';
import { repoApi } from '../reposApiSlice';

describe('<HomePage />', () => {
  let globalStore = configureStore({
    reducer: {
      repos: repoApi.reducer,
    },
  });

  beforeAll(() => {
    globalStore = store;
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={globalStore}>
        <IntlProvider locale="en">
          <HomePage />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should submit and show repositories', () => {
    const { getByRole, getByPlaceholderText } = render(
      <Provider store={globalStore}>
        <IntlProvider locale="en">
          <HomePage />
        </IntlProvider>
      </Provider>,
    );

    fireEvent.change(getByPlaceholderText('mxstbr'), {
      target: { value: 'test' },
    });

    fireEvent.submit(getByRole('form'));
  });
});
