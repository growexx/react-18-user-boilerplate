/**
 *
 * Tests for SampleForm
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import {
  fireEvent,
  render,
  queryByAttribute,
  screen,
} from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { Provider } from 'react-redux';
import history from 'utils/history';
import SampleForm from '../index';
import configureStore from '../../../configureStore';
let globalStore;
const props = {
  pristine: true,
  reset: true,
  submitting: true,
};
const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <SampleForm {...props} />
        </Router>
      </IntlProvider>
    </Provider>,
  );
describe('<SampleForm />', () => {
  beforeEach(() => {
    const { store } = configureStore({});
    globalStore = store;
  });
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('Should change form fields', () => {
    const eventObject = {
      preventDefault: jest.fn(),
      target: {
        value: 'test',
        name: 'test',
        checked: true,
      },
    };
    const {
      getByPlaceholderText,
      getByTestId,
      getByRole,
      container,
      getByText,
    } = componentWrapper();
    const getById = queryByAttribute.bind(null, 'id');
    fireEvent.change(getByPlaceholderText('First Name'), eventObject);
    fireEvent.change(getByPlaceholderText('Last Name'), eventObject);
    fireEvent.change(getByPlaceholderText('Email'), {
      target: {
        value: 'test@growexx.com',
        name: 'email',
      },
    });
    fireEvent.click(getById(container, 'employed'), eventObject);
    fireEvent.mouseDown(getByRole('combobox'));
    fireEvent.change(getByRole('combobox'), {
      target: {
        value: 'ff0000',
      },
    });
    // .ant-select-item-option-content
    fireEvent.click(
      document.querySelectorAll('.ant-select-item-option-content')[0],
    );
    fireEvent.change(getByTestId('Notes'), eventObject);
    fireEvent.focus(getByPlaceholderText('From'), eventObject);
    fireEvent.blur(getByPlaceholderText('From'), eventObject);
    screen.getByPlaceholderText('From').blur();
    // onChange from
    fireEvent.mouseDown(getByPlaceholderText('From'));
    fireEvent.change(getByPlaceholderText('From'), {
      target: {
        value: '2020-10-12',
      },
    });
    fireEvent.click(document.querySelectorAll('.ant-picker-cell-selected')[0]);
    // onChange To
    const to = getByPlaceholderText('To');
    fireEvent.mouseDown(to);
    fireEvent.change(to, {
      target: {
        value: '2021-10-28',
      },
    });
    fireEvent.click(document.querySelectorAll('.ant-picker-cell-selected')[0]);
    const button = getByText('Submit');
    fireEvent.click(button);
    expect(getByPlaceholderText('First Name')).toBeTruthy();
  });
});
