/**
 *
 * Tests for TwoFactorAuthentication
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import history from 'utils/history';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { TwoFactorAuthentication, mapDispatchToProps } from '../index';
import Lodable from '../Loadable';
import { TEST_OTP_VALUE, TEST_OTP_VALUE_WITHOUT_LENGTH } from '../constants';
import configureStore from '../../../../configureStore';
let globalStore;
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
describe('<TwoFactorAuthentication />', () => {
  beforeAll(() => {
    const { store } = configureStore({});
    globalStore = store;
  });
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper(TwoFactorAuthentication);
    expect(firstChild).toMatchSnapshot();
  });
  it('mapDispatch to props', () => {
    const mockFn = jest.fn();
    const returnValue = mapDispatchToProps(mockFn);
    // when otp length is achieved
    returnValue.onChangeValue(TEST_OTP_VALUE.toString());
    // when otp length is not achieved
    returnValue.onChangeValue(TEST_OTP_VALUE_WITHOUT_LENGTH.toString());
    expect(mockFn).toBeCalled();
  });
  it('Should render and match the snapshot Loadable', () => {
    const {
      container: { firstChild },
    } = componentWrapper(Lodable);
    expect(firstChild).toMatchSnapshot();
  });
});
