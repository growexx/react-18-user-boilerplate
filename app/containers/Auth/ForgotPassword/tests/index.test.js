/**
 *
 * Tests for ForgotPassword
 *
 */

import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import history from 'utils/history';
import request from 'utils/request';
import { store } from 'configureStore';
import ForgotPassword from '../Loadable';
import { TEST_IDS } from '../stub/test.stub';
jest.mock('utils/request');
// if not using firebase messaging remove this mock
jest.mock('firebase/messaging', () => {
  const actualModule = jest.requireActual('firebase/messaging');
  return {
    ...actualModule,
    onMessage: jest.fn(),
    getMessaging: jest.fn(),
  };
});
let globalStore;

const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <ForgotPassword />
        </Router>
      </IntlProvider>
    </Provider>,
  );

describe('<ForgotPassword />', () => {
  beforeAll(() => {
    globalStore = store;
  });

  beforeEach(() => {
    request.mockImplementation(() => Promise.resolve({}));
  });

  afterEach(() => {
    request.mockClear();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('Successfully submitted reset request', async () => {
    request.mockImplementation(() =>
      Promise.resolve({ status: 1, message: 'Successfully sent reset email!' }),
    );
    const { getByTestId, getByPlaceholderText } = componentWrapper();
    await act(async () => {
      fireEvent.change(getByPlaceholderText('Email'), {
        target: { value: 'john.doe@growexx.com' },
      });
      fireEvent.click(getByTestId(TEST_IDS.RESET_PASSWORD));
    });
  });
});

describe('Forgot Password Request', () => {
  beforeAll(() => {
    globalStore = store;
  });

  afterEach(() => {
    request.mockClear();
  });

  it('Successfully submitted reset request', async () => {
    request.mockImplementation(() =>
      Promise.resolve({ status: 1, message: 'Successfully sent reset email!' }),
    );
    const { getByTestId, getByPlaceholderText } = componentWrapper();
    await act(async () => {
      fireEvent.change(getByPlaceholderText('Email'), {
        target: { value: 'john.doe@growexx.com' },
      });
      fireEvent.click(getByTestId(TEST_IDS.RESET_PASSWORD));
    });
  });

  it('error in reset request', async () => {
    const errMessage = 'Error in reset request!';
    request.mockImplementation(() => Promise.reject(new Error(errMessage)));

    const { getByTestId, getByPlaceholderText } = componentWrapper();
    await act(async () => {
      fireEvent.change(getByPlaceholderText('Email'), {
        target: { value: 'john.doe@growexx.com' },
      });
      fireEvent.click(getByTestId(TEST_IDS.RESET_PASSWORD));
    });
    expect(request).toHaveBeenCalledTimes(1);
  });
});
