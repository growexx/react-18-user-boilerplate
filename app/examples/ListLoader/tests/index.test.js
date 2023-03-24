/**
 *
 * Tests for Loader
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import request from 'utils/request';
import configureStore from '../../../configureStore';
import Loader from '../index';
let store;
jest.mock('utils/request');
const componentWrapper = () =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <Loader />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );
describe('<Loader />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
});
