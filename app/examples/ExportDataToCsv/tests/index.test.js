/**
 *
 * Tests for ExportDataToCsv
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
import ExportDataToCsv from '../index';
import configureStore from '../../../configureStore';
let globalStore;
const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <ExportDataToCsv />
        </Router>
      </IntlProvider>
    </Provider>,
  );

describe('<ExportDataToCsv />', () => {
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
  it('should trigger export', () => {
    const { container } = componentWrapper();
    const checkbox = container.querySelector('input');
    const element = checkbox;
    fireEvent.click(element);
    const { getAllByTestId } = componentWrapper();
    const buttonElement = getAllByTestId('ExportButton')[0];
    fireEvent.click(buttonElement);
    expect(buttonElement.tagName).toEqual('BUTTON');
  });
});
