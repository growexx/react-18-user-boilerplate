/**
 *
 * Tests for Charts
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { browserHistory } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import history from 'utils/history';
import { ConnectedRouter } from 'connected-react-router';
import Charts from '../index';
import configureStore from '../../../configureStore';

let store;

const props = {};

const componentWrapper = updatedProps =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <Charts {...props} {...updatedProps} />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );

describe('Check component:<Charts /> is rendering properly', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('Should render and match the snapshot', () => {
    global.Date = jest.fn(() =>
      Object.assign(Date, {
        getTime: jest.fn(() => ({
          toString: jest.fn(() => ({
            slice: jest.fn(() => '000'),
          })),
        })),
      }),
    );
    global.Date.now = jest.fn(() => 1530518207007);
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
});
