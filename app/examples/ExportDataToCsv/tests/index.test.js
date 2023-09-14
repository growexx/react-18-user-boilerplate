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
import { store } from 'configureStore';
import ExportDataToCsv from '../index';
let globalStore;
// if not using firebase messaging remove this mock
jest.mock('firebase/messaging', () => {
  const actualModule = jest.requireActual('firebase/messaging');
  return {
    ...actualModule,
    onMessage: jest.fn(),
    getMessaging: jest.fn(),
  };
});
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
