/**
 * Testing the UnauthorizedPage
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import history from 'utils/history';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Unauthorized from '../index';
import configureStore from '../../../configureStore';
let store;

const componentWrapper = () =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <Unauthorized />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );

describe('<Unauthorized />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
});
