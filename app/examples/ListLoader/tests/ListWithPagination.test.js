import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import history from 'utils/history';
import request from 'utils/request';
import { store } from 'configureStore';
import ListWithPagination from '../ListWithPagination';
let globalStore;
// if not using firebase messaging remove this mock
jest.mock('firebase/messaging', () => {
  const actualModule = jest.requireActual('firebase/messaging');
  return {
    ...actualModule,
    onMessage: jest.fn(),
    getMessaging: jest.fn(),
  };
});
jest.mock('utils/request');
const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <ListWithPagination />
        </Router>
      </IntlProvider>
    </Provider>,
  );
describe('<ListWithLoadMore />', () => {
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
});
