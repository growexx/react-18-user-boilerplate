/**
 *
 * Tests for FontAwesomeDemo
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import history from 'utils/history';
import { IntlProvider } from 'react-intl';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { FontAwesomeDemo } from '../index';
import configureStore from '../../../configureStore';
let globalStore;
const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <FontAwesomeDemo />
        </Router>
      </IntlProvider>
    </Provider>,
  );

describe('<FontAwesomeDemo />', () => {
  beforeAll(() => {
    const { store } = configureStore({});
    globalStore = store;
  });
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
});
