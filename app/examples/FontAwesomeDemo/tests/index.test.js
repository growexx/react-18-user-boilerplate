/**
 *
 * Tests for FontAwesomeDemo
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import history from 'utils/history';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { IntlProvider } from 'react-intl';
import { FontAwesomeDemo } from '../index';
import configureStore from '../../../configureStore';
let store;
const componentWrapper = () =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <FontAwesomeDemo />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );

describe('<FontAwesomeDemo />', () => {
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
