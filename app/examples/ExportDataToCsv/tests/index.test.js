/**
 *
 * Tests for ExportDataToCsv
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import { browserHistory } from 'react-router-dom';
import ExportDataToCsv from '../index';
import configureStore from '../../../configureStore';
let store;
const componentWrapper = () =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <ExportDataToCsv />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );

describe('<ExportDataToCsv />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('should trigger export', () => {
    const { container } = componentWrapper();
    const checkbox = container.querySelector('input');
    const element = checkbox;
    fireEvent.click(element);
    const { getByTestId } = componentWrapper();
    const buttonElement = getByTestId('ExportButton');
    fireEvent.click(buttonElement);
    expect(buttonElement.tagName).toEqual('BUTTON');
  });
});
