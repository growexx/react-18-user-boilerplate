/**
 *
 * Tests for Login
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
import { Login, mapDispatchToProps } from '../index';
import Lodable from '../Loadable';
import configureStore from '../../../../configureStore';
let store;
const props = {
  error: true,
};
const componentWrapper = Component =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <Component {...props} />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );
describe('<Login />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper(Login);
    expect(firstChild).toMatchSnapshot();
  });
  it('mapDispatch to props', () => {
    const mockFn = jest.fn();
    const eventObject = {
      target: {
        value: 'test',
      },
      preventDefault: jest.fn(),
    };
    const returnValue = mapDispatchToProps(mockFn);
    returnValue.onChangeEmail(eventObject);
    returnValue.onChangePassword(eventObject);
    returnValue.onSignIn(eventObject);
    const eventObjectWithoutPreventDefault = {
      target: {
        value: 'test',
      },
    };
    returnValue.onSignIn(eventObjectWithoutPreventDefault);
    expect(mockFn).toBeCalled();
  });
  it('Should render and match the snapshot Loadable', () => {
    const {
      container: { firstChild },
    } = componentWrapper(Lodable);
    expect(firstChild).toMatchSnapshot();
  });
});
