/**
 *
 * Tests for NumeralConversion
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import history from 'utils/history';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import NumeralConversion from '../index';
import configureStore from '../../../configureStore';
let store;
const componentWrapper = () =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <NumeralConversion />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );

describe('<NumeralConversion />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('Should fire conversion button', () => {
    const { container } = componentWrapper();
    const input = container.querySelector('input');
    fireEvent.change(input, { target: { value: '1234' } });
    const button = container.querySelector('button');
    fireEvent.click(button);
    expect(button).toBeTruthy();
  });
});
