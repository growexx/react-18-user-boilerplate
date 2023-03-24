/**
 *
 * Tests for OtpComponent
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
import OtpComponent from '../index';
import configureStore from '../../../configureStore';
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

describe('<OtpComponent />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper(OtpComponent);
    expect(firstChild).toMatchSnapshot();
  });
});
