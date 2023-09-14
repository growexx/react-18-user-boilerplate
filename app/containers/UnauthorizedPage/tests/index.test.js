/**
 * Testing the UnauthorizedPage
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import history from 'utils/history';
import { store } from 'configureStore';
import Unauthorized from '../index';
// if not using firebase messaging remove this mock
jest.mock('firebase/messaging', () => {
  const actualModule = jest.requireActual('firebase/messaging');
  return {
    ...actualModule,
    onMessage: jest.fn(),
    getMessaging: jest.fn(),
  };
});
let globalStore;

const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <Unauthorized />
        </Router>
      </IntlProvider>
    </Provider>,
  );

describe('<Unauthorized />', () => {
  beforeAll(() => {
    globalStore = store;
  });
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
});
