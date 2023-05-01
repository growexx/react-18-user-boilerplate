import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
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

  it('should render and match the snapshot', () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('call LoadMore', async () => {
    request.mockImplementation(() =>
      Promise.resolve({
        status: 1,
        results: [
          {
            name: {
              last: 'test',
              email: 'test@234.com',
            },
          },
        ],
      }),
    );
    const { container } = componentWrapper();
    await waitFor(() => expect(request).toHaveBeenCalledTimes(2));
    fireEvent.click(container.querySelector('button'));
    expect(request).toHaveBeenCalled();
  });
});
