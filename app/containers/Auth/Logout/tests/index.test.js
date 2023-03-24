/**
 *
 * Tests for Registration
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import history from 'utils/history';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from '../../../../configureStore';
import Logout from '../index';
import Lodable from '../Loadable';
let store;
const componentWrapper = Component =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );

describe('<Registration />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper(Logout);
    expect(firstChild).toMatchSnapshot();
  });
  it('Should render and match the snapshot Loadable', () => {
    const {
      container: { firstChild },
    } = componentWrapper(Lodable);
    expect(firstChild).toMatchSnapshot();
  });
});
