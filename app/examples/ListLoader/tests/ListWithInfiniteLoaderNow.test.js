/* eslint-disable react/prop-types */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import history from 'utils/history';
import request from 'utils/request';
import { store } from 'configureStore';
import ListWithInfiniteLoader from '../ListWithInfiniteLoader';
import { responseWithLargeDataSet } from '../stub/test.stub';

let globalStore;
jest.mock('utils/request');
jest.mock('react-infinite-scroller', () => {
  function LoadMore({ children, loadMore }) {
    return (
      <div data-testid="infinite-scroll">
        {children}
        <button onClick={loadMore} data-testid="load-more-button" type="submit">
          Load More
        </button>
      </div>
    );
  }
  return LoadMore;
});

const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <ListWithInfiniteLoader />
        </Router>
      </IntlProvider>
    </Provider>,
  );

describe('<ListWithInfiniteLoader />', () => {
  beforeAll(() => {
    globalStore = store;
  });

  it('should render and match the snapshot', () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('should render and match the snapshot', async () => {
    request.mockImplementation(() =>
      Promise.resolve({
        status: 1,
        results: [
          {
            name: {
              last: 'testInfiniteLoader',
              email: 'test@234.com',
            },
          },
        ],
      }),
    );
    const {
      container: { firstChild },
    } = componentWrapper();
    await waitFor(() => expect(request).toHaveBeenCalledTimes(2));
    expect(firstChild).toMatchSnapshot();
  });

  it('should load more items when scrolling', async () => {
    request.mockImplementation(() => Promise.resolve(responseWithLargeDataSet));
    const { getByTestId } = componentWrapper();
    waitFor(() => {
      getByTestId('load-more-button').click();
    });
    await waitFor(() => expect(request).toHaveBeenCalledTimes(4));
  });
});
