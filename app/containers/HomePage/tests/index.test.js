/**
 * Test the HomePage
 */

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { IntlProvider } from 'react-intl';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from 'configureStore';
import { HomePage } from '../index';
import { repoApi } from '../reposApiSlice';
import { MOCK_REPO_RESPONSE } from '../stub/repo.stub';
import { fetchReposError } from '../messages';

fetchMock.enableMocks();

describe('<HomePage />', () => {
  let globalStore = configureStore({
    reducer: {
      repos: repoApi.reducer,
    },
  });

  beforeAll(() => {
    fetchMock.resetMocks();
    globalStore = store;
  });

  it('should render and match the snapshot', async () => {
    fetchMock.mockIf(
      /https:\/\/api.github.com\/users\/.+\/repos\?type=all&sort=updated/,
      () =>
        Promise.resolve({
          status: 200,
          body: JSON.stringify([MOCK_REPO_RESPONSE]),
        }),
    );
    const {
      container: { firstChild },
    } = render(
      <Provider store={globalStore}>
        <IntlProvider locale="en">
          <HomePage />
        </IntlProvider>
      </Provider>,
    );
    await waitFor(() => {
      expect(firstChild).toMatchSnapshot();
    });
  });

  it('should be able to handle api failure for fetching repos', async () => {
    fetchMock.mockIf(
      /https:\/\/api.github.com\/users\/.+\/repos\?type=all&sort=updated/,
      () => Promise.reject(new Error('error')),
    );
    const { getByText } = render(
      <Provider store={globalStore}>
        <IntlProvider locale="en">
          <HomePage />
        </IntlProvider>
      </Provider>,
    );
    await waitFor(() => {
      expect(getByText(fetchReposError)).toBeInTheDocument();
    });
  });

  it('should submit and show repositories', async () => {
    fetchMock.mockIf(
      /https:\/\/api.github.com\/users\/.+\/repos\?type=all&sort=updated/,
      () => Promise.reject(new Error('error')),
    );
    const { getByRole, getByPlaceholderText, getAllByText } = render(
      <Provider store={globalStore}>
        <IntlProvider locale="en">
          <HomePage />
        </IntlProvider>
      </Provider>,
    );

    await waitFor(() => {
      fireEvent.change(getByPlaceholderText('mxstbr'), {
        target: { value: 'test' },
      });
    });

    await waitFor(() => {
      fireEvent.submit(getByRole('form'));
    });

    await waitFor(() => {
      expect(getAllByText(fetchReposError)[0]).toBeInTheDocument();
    });
  });
});
