/**
 *
 * Tests for TwoFactorAuthentication
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
import { TwoFactorAuthentication } from '../index';
import Loadable from '../Loadable';
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
    globalStore = store;
  });
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper(TwoFactorAuthentication);
    expect(firstChild).toMatchSnapshot();
  });
  it('Should render and match the snapshot Loadable', () => {
    const {
      container: { firstChild },
    } = componentWrapper(Loadable);
    expect(firstChild).toMatchSnapshot();
  });
});
