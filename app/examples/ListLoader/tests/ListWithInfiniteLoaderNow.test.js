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

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render and match the snapshot', async () => {
    request.mockImplementation(() =>
      Promise.resolve({
        status: 1,
        results: [
          {
            id: '1',
            loading: false,
            gender: 'male',
            name: {
              title: 'Mr',
              first: 'Test',
              last: 'testInfiniteLoader',
            },
            email: 'test@234.com',
          },
        ],
      }),
    );
    const {
      container: { firstChild },
    } = componentWrapper();
    await waitFor(() => expect(request).toHaveBeenCalledTimes(1));
    expect(firstChild).toMatchSnapshot();
  });
});
