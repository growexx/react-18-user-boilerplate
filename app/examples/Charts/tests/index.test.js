/**
 *
 * Tests for Charts
 *
 */

import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import history from 'utils/history';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import Charts from '../index';
import configureStore from '../../../configureStore';
import { GET_COLORS } from '../constants';

const resizeObserverMock = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
window.ResizeObserver = resizeObserverMock;

let globalStore;

const props = {};

const componentWrapper = updatedProps =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <Charts {...props} {...updatedProps} />
        </Router>
      </IntlProvider>
    </Provider>,
  );

describe('Check component:<Charts /> is rendering properly', () => {
  beforeAll(() => {
    const { store } = configureStore({});
    globalStore = store;
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });
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

  it('Should change period', () => {
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
      getByRole,
    } = componentWrapper();
    fireEvent.mouseDown(getByRole('combobox'));
    fireEvent.click(
      document.querySelectorAll('.ant-select-item-option-content')[1],
    );
    expect(firstChild).toMatchSnapshot();
  });
});

describe('GET_COLORS function', () => {
  it('should return an array of colors with the same length as the input data array', () => {
    const data = ['a', 'b', 'c'];
    const colors = GET_COLORS(data);
    expect(colors).toHaveLength(data.length);
  });

  it('should handle an input data array with more than 100 elements', () => {
    const data = new Array(101).fill('a');
    const colors = GET_COLORS(data);
    expect(colors).toHaveLength(data.length);
    expect(colors[0]).toEqual('#0088FE');
  });
});
