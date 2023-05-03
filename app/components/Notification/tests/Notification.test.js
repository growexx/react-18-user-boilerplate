import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { createMemoryHistory } from 'history';
import configureStore from 'configureStore';
import 'jest-dom/extend-expect';
import {
  TEST_IDS,
  getNotificationsSuccessMock,
  getNotificationsSuccessMockForClick,
  getNotificationsFailureData,
  getNotificationsMockWithNoData,
  getNotificationsMockWithLessData,
} from 'components/Notification/stub';
import Notification from 'components/Notification/index';
import { getNotificationsMock } from 'components/Notification/constants';
jest.mock('components/Notification/constants');

describe('<Notification />', () => {
  const history = createMemoryHistory();
  const { store } = configureStore({}, history);
  it('should render notifications first time with success', async () => {
    getNotificationsMock.mockImplementation(() =>
      getNotificationsSuccessMock(),
    );
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Notification />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    fireEvent.click(getByTestId(TEST_IDS.BELL_ICON));
    await waitFor(
      () => {
        expect(getByText('Notifications')).toBeInTheDocument();
        expect(document.querySelector('.ant-skeleton')).toBeFalsy();
      },
      { timeout: 2000 },
    );
    expect(getByTestId(TEST_IDS.MARK_ALL_READ)).toBeInTheDocument();
  });
  it('should render notifications first time with success and click on single notification', async () => {
    getNotificationsMock.mockImplementation(() =>
      getNotificationsSuccessMockForClick(),
    );
    const { getByTestId, getByText, getAllByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Notification />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    fireEvent.click(getByTestId(TEST_IDS.BELL_ICON));
    await waitFor(
      () => {
        expect(getByText('Notifications')).toBeInTheDocument();
        expect(document.querySelector('.ant-skeleton')).toBeFalsy();
      },
      { timeout: 2000 },
    );
    fireEvent.click(getAllByTestId(TEST_IDS.NOTIFICATION_ITEM)[0]);
    // reads one notification
    expect(getByText('4')).toBeInTheDocument();
    fireEvent.click(getAllByTestId(TEST_IDS.NOTIFICATION_ITEM)[1]);
    // reads one notification
    expect(getByText('3')).toBeInTheDocument();
  });
  it('should render notifications first time with success and click on mark all read', async () => {
    getNotificationsMock.mockImplementation(() =>
      getNotificationsSuccessMock(),
    );
    const { getByTestId, getByText, queryByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Notification />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    fireEvent.click(getByTestId(TEST_IDS.BELL_ICON));
    await waitFor(
      () => {
        expect(getByText('Notifications')).toBeInTheDocument();
        expect(document.querySelector('.ant-skeleton')).toBeFalsy();
      },
      { timeout: 2000 },
    );
    fireEvent.click(getByTestId(TEST_IDS.MARK_ALL_READ));
    expect(queryByTestId(TEST_IDS.MARK_ALL_READ)).not.toBeInTheDocument();
  });
  it('should render notifications first time with success and data less than limit', async () => {
    getNotificationsMock.mockImplementation(() =>
      getNotificationsMockWithLessData(),
    );
    const { getByTestId, getByText, queryByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Notification />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    fireEvent.click(getByTestId(TEST_IDS.BELL_ICON));
    await waitFor(
      () => {
        expect(getByText('Notifications')).toBeInTheDocument();
        expect(document.querySelector('.ant-skeleton')).toBeFalsy();
      },
      { timeout: 2000 },
    );
    expect(queryByTestId(TEST_IDS.INFINITE_SCROLLING)).not.toBeInTheDocument();
  });
  it('should render empty message', async () => {
    getNotificationsMock.mockImplementation(() =>
      getNotificationsMockWithNoData(),
    );
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Notification />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    fireEvent.click(getByTestId(TEST_IDS.BELL_ICON));
    await waitFor(
      () => {
        expect(getByText('Notifications')).toBeInTheDocument();
        expect(document.querySelector('.ant-skeleton')).toBeFalsy();
      },
      { timeout: 2000 },
    );
    expect(getByTestId(TEST_IDS.EMPTY_CONTAINER)).toBeInTheDocument();
  });
  it('should catch the failure', async () => {
    getNotificationsMock.mockImplementation(() =>
      getNotificationsFailureData(),
    );
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Notification />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    fireEvent.click(getByTestId(TEST_IDS.BELL_ICON));
    await waitFor(
      () => {
        expect(getByText('Notifications')).toBeInTheDocument();
        expect(document.querySelector('.ant-skeleton')).toBeFalsy();
      },
      { timeout: 2000 },
    );
    expect(getByTestId(TEST_IDS.EMPTY_CONTAINER)).toBeInTheDocument();
  });
  it('should render a div', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Notification />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
