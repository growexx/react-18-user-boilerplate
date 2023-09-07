/**
 *
 * Tests for NumeralConversion
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import history from 'utils/history';
import { store } from 'configureStore';
import NumeralConversion from '../index';
let globalStore;
const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <NumeralConversion />
        </Router>
      </IntlProvider>
    </Provider>,
  );

describe('<NumeralConversion />', () => {
  beforeAll(() => {
    globalStore = store;
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
