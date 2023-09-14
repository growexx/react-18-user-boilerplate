/**
 *
 * Tests for Registration
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import history from 'utils/history';
import { store } from 'configureStore';
import { Registration } from '../index';
import Lodable from '../Loadable';

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
const componentWrapper = Component =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <Component />
        </Router>
      </IntlProvider>
    </Provider>,
  );

describe('<Registration />', () => {
  beforeAll(() => {
    globalStore = store;
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper(Registration);
    expect(firstChild).toMatchSnapshot();
  });
  it('Should render and match the snapshot Loadable', () => {
    const {
      container: { firstChild },
    } = componentWrapper(Lodable);
    expect(firstChild).toMatchSnapshot();
  });
});
