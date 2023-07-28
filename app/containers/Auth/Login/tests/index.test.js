/**
 *
 * Tests for Login
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import history from 'utils/history';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { Login } from '../index';
import Lodable from '../Loadable';
import configureStore from '../../../../configureStore';
let globalStore;
const props = {
  error: true,
};
const componentWrapper = Component =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <Component {...props} />
        </Router>
      </IntlProvider>
    </Provider>,
  );

describe('<Login />', () => {
  beforeAll(() => {
    const { store } = configureStore({});
    globalStore = store;
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper(Login);
    expect(firstChild).toMatchSnapshot();
  });
  it('Should render and match the snapshot Loadable', () => {
    const {
      container: { firstChild },
    } = componentWrapper(Lodable);
    expect(firstChild).toMatchSnapshot();
  });
  it('Should dispatch events', () => {
    const { getByPlaceholderText, getByText } = componentWrapper(Login);
    fireEvent.change(getByPlaceholderText('Email'), {
      target: {
        value: 'it@growexx.com',
      },
    });
    fireEvent.change(getByPlaceholderText('Password'), {
      target: {
        value: 'it@growexx.com',
      },
    });
    fireEvent.click(getByText('SIGN IN'));
  });
});
