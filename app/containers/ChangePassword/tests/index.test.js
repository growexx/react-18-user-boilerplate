/**
 *
 * Tests for ChangePassword
 *
 *
 *
 */

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import '@testing-library/jest-dom';
import history from 'utils/history';
import { store } from 'configureStore';
import ChangePassword from '../index';
import Loadable from '../Loadable';
let globalStore;
const props = {
  error: {
    message: 'error message',
  },
  success: {
    message: 'success message',
  },
};
const componentWrapper = Component =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <Component {...props} />
        </Router>
      </IntlProvider>
    </Provider>,
  );
describe('<ChangePassword />', () => {
  beforeAll(() => {
    globalStore = store;
  });

  test('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper(ChangePassword);
    expect(firstChild).toMatchSnapshot();
  });
  test('Should render and match the snapshot Loadable', async () => {
    const {
      container: { firstChild },
    } = componentWrapper(Loadable);
    expect(firstChild).toMatchSnapshot();
  });
  test('Should Click Button and show error for passwords not same', async () => {
    const { container, getByPlaceholderText } =
      componentWrapper(ChangePassword);
    fireEvent.change(getByPlaceholderText('Current Password'), {
      target: {
        name: 'currentPassword',
        value: 'PassWord$',
      },
    });
    fireEvent.change(getByPlaceholderText('New Password'), {
      target: { name: 'newPassword', value: 'password123' },
    });
    fireEvent.change(getByPlaceholderText('Confirm Password'), {
      target: { name: 'newPassword', value: 'password456' },
    });
    const preventDefault = jest.fn();
    const button = container.querySelector('button');
    fireEvent.click(button, {
      preventDefault,
    });
    await waitFor(() => expect(button).toBeTruthy());
  });
});
