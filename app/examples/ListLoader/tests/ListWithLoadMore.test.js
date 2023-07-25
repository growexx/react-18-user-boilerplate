import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { act } from 'react-dom/test-utils';
import history from 'utils/history';
import request from 'utils/request';
import configureStore from '../../../configureStore';
import ListWithLoadMore from '../ListWithLoadMore';
let globalStore;
jest.mock('utils/request');
const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <ListWithLoadMore />
        </Router>
      </IntlProvider>
    </Provider>,
  );

describe('<ListWithLoadMore />', () => {
  beforeAll(() => {
    const { store } = configureStore({});
    globalStore = store;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render and match the snapshot with call LoadMore', async () => {
    request.mockImplementation(() =>
      Promise.resolve({
        status: 1,
        results: [
          { id: '1', name: { last: 'test name 1' }, email: 'test@example.com' },
          { id: '2', name: { last: 'test name 2' }, email: 'test@example.co' },
          { id: '3', name: { last: 'test name 3' }, email: 'test@example.cm' },
          { id: '4', name: { last: 'test name 4' }, email: 'test@example.om' },
          {
            id: '5',
            name: { last: 'test name 5' },
            email: 'test@example.co.in',
          },
        ],
      }),
    );

    const { container, debug } = componentWrapper();
    expect(container.firstChild).toMatchSnapshot();

    await waitFor(() => {
      debug(container.querySelector('button'));
      expect(request).toHaveBeenCalledTimes(1);
    });
    act(() => {
      fireEvent.click(container.querySelector('button'));
    });
    expect(request).toHaveBeenCalled();
  });
});
