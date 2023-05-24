import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import history from 'utils/history';
import request from 'utils/request';
import configureStore from '../../../configureStore';
import ListWithInfiniteLoader from '../ListWithInfiniteLoader';
let globalStore;
jest.mock('utils/request');
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
});
