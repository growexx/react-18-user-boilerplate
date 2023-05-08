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
import history from 'utils/history';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import ChangePassword, { mapDispatchToProps } from '../index';
import Lodable from '../Loadable';
import configureStore from '../../../configureStore';
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
    const { store } = configureStore({});
    globalStore = store;
  });

  test('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper(ChangePassword);
    expect(firstChild).toMatchSnapshot();
  });
  test('mapDispatch to props', async () => {
    const mockFn = jest.fn();
    const returnValue = await mapDispatchToProps(mockFn);
    const eventObject = {
      target: {
        target: { name: 'currentPassword', value: 'test' },
      },
      preventDefault: jest.fn(),
    };
    const returnValueForSubmitData = await mapDispatchToProps(mockFn);
    await returnValueForSubmitData.updateField(eventObject);
    await returnValueForSubmitData.submitData(eventObject);

    const eventObjectWithoutPreventDefault = {
      target: {
        value: 'test',
      },
    };
    await returnValue.submitData(eventObjectWithoutPreventDefault);
    await waitFor(() => {
      expect(mockFn).toBeCalled();
    });
  });
  test('Should render and match the snapshot Loadable', async () => {
    const {
      container: { firstChild },
    } = componentWrapper(Lodable);
    expect(firstChild).toMatchSnapshot();
  });
  test('Should Click Button', async () => {
    const { container, getByPlaceholderText } = componentWrapper(
      ChangePassword,
    );
    fireEvent.change(getByPlaceholderText('Current Password'), {
      target: {
        name: 'currentPassword',
        value: 'PassWord$',
      },
    });
    fireEvent.change(getByPlaceholderText('New Password'), {
      target: { name: 'newPassword', value: 'PassWord$' },
    });
    fireEvent.change(getByPlaceholderText('Confirm Password'), {
      target: { name: 'newPassword', value: 'PassWord$' },
    });
    const preventDefault = jest.fn();
    const button = container.querySelector('button');
    fireEvent.click(button, {
      preventDefault,
    });
    await waitFor(() => expect(button).toBeTruthy());
  });
});
