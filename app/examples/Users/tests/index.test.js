/**
 *
 * Tests for Users
 *
 */

import React from 'react';
import { fireEvent, render, waitForElement } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from 'utils/history';
import request from 'utils/request';
import { ConnectedRouter } from 'connected-react-router';
import Users, { mapDispatchToProps } from '../index';
import configureStore from '../../../configureStore';
import {
  addNewUserFailure,
  addNewUserSuccess,
  failedResponse,
  responseWithList,
  responseWithZeroList,
  USER_DATA,
} from '../stub';
import { TEST_IDS } from '../constants';
jest.mock('utils/request');

let store;
const props = {
  pristine: true,
  reset: true,
  submitting: true,
};

const fieldUpdateViaPlaceHolder = [
  {
    key: 'john.doe@growexx.com',
    value: USER_DATA.EMAIL,
  },
  {
    key: 'John',
    value: USER_DATA.NAME,
  },
  {
    key: 'Doe',
    value: USER_DATA.NAME,
  },
];

const componentWrapper = updatedProps =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <Users {...props} {...updatedProps} />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );

describe('Check component:<Users /> is rendering properly', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  beforeEach(() => {
    request.mockImplementation(() => Promise.resolve(responseWithZeroList()));
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

  it('mapDispatch to props', () => {
    const mockFn = jest.fn();
    const returnValue = mapDispatchToProps(mockFn);
    returnValue.updateField(
      { target: { name: 'email' } },
      { target: { value: USER_DATA.EMAIL } },
    );

    expect(mockFn).toBeCalled();
  });

  it('Click: New User Modal should show modal', async () => {
    const { getByTestId, getByText } = componentWrapper();
    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.ADD_USER));

    // Check Elements are showing
    expect(getByText('Add User')).toBeTruthy();

    fireEvent.click(getByTestId(TEST_IDS.ADD_USER));
    fireEvent.click(getByTestId(TEST_IDS.USER_MODAL_CANCEL));
  });

  it('Click Delete: Show Confirmation Modal', async () => {
    const { getByTestId, getByText } = componentWrapper();
    await waitForElement(() => getByText('Active'));

    // Click Delete Button
    fireEvent.click(getByTestId(TEST_IDS.DELETE_BUTTON));

    // Check Elements are showing
    expect(getByText('OK', { trim: true })).toBeTruthy();
  });

  it('Click Delete: Show Confirmation Modal and click confirm', async () => {
    const { getByTestId, getByText } = componentWrapper();
    await waitForElement(() => getByText('Active'));

    // Click Delete Button
    fireEvent.click(getByTestId(TEST_IDS.DELETE_BUTTON));

    // Check Elements are showing
    expect(getByText('OK', { trim: true })).toBeTruthy();
    fireEvent.click(getByTestId(TEST_IDS.DELETE_BUTTON_CONFIRMED));
  });
});

describe('Check listing of users is rendering properly', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  beforeEach(() => {
    request.mockImplementation(() => Promise.resolve(responseWithZeroList()));
  });

  afterEach(() => {
    request.mockClear();
  });

  it('No Records found for users', async () => {
    request.mockImplementation(() => Promise.resolve(responseWithZeroList()));
    const { getByText } = componentWrapper({ demo: false });
    await waitForElement(() => getByText('No Data'));
    expect(getByText('No Data')).toBeTruthy();
  });

  it('Users Listing with few records should be shown', async () => {
    request.mockImplementation(() => Promise.resolve(responseWithList()));
    const { getByText } = componentWrapper({ demo: false });
    await waitForElement(() => getByText('Active'));

    expect(getByText('Active')).toBeTruthy();
  });

  it('Users Listing with pagination', async () => {
    request.mockImplementation(() => Promise.resolve(responseWithList()));
    const { getByText, getByTitle } = componentWrapper({ demo: false });
    await waitForElement(() => getByText('Active'));

    // Expand Data
    fireEvent.click(document.querySelectorAll('.ant-table-row-expand-icon')[0]);

    expect(getByText('Active')).toBeTruthy();
    fireEvent.click(getByTitle('2'));
  });

  it('Failed Users Listing api', async () => {
    request.mockImplementationOnce(() => Promise.reject(failedResponse));
    const { getByText } = componentWrapper({ demo: false });
    await waitForElement(() => getByText('No Data'));
    expect(getByText('No Data')).toBeTruthy();
  });

  it('Toggle User Status', async () => {
    request.mockImplementation(() => Promise.resolve(responseWithList()));

    const { getByTestId, getByText } = componentWrapper({
      demo: false,
    });
    // Wait till data shows
    await waitForElement(() => getByText('Active'));

    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.STATUS_TOGGLE));
  });

  it('Click Delete: Show Confirmation Modal and click confirm', async () => {
    request.mockImplementation(() => Promise.resolve(failedResponse()));

    const { getByTestId, getByText } = componentWrapper();
    await waitForElement(() => getByText('Active'));

    // Click Delete Button
    fireEvent.click(getByTestId(TEST_IDS.DELETE_BUTTON));

    // Check Elements are showing
    expect(getByText('OK', { trim: true })).toBeTruthy();
    fireEvent.click(getByTestId(TEST_IDS.DELETE_BUTTON_CONFIRMED));
  });

  it('Click Delete: Show Confirmation Modal and click confirm', async () => {
    request.mockImplementation(() => Promise.resolve(failedResponse()));

    const { getByTestId, getByText } = componentWrapper();
    await waitForElement(() => getByText('Active'));

    // Click Delete Button
    fireEvent.click(getByTestId(TEST_IDS.DELETE_BUTTON));

    // Check Elements are showing
    expect(getByText('OK', { trim: true })).toBeTruthy();
    fireEvent.click(getByTestId(TEST_IDS.DELETE_CONFIRMATION_CANCEL));
  });

  it('Toggle User Status Local', async () => {
    request.mockImplementation(() => Promise.resolve(responseWithList()));

    const { getByTestId, getByText } = componentWrapper({
      demo: true,
    });
    // Wait till data shows
    await waitForElement(() => getByText('Active'));

    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.STATUS_TOGGLE));
  });

  it('Toggle User Status Local', async () => {
    request.mockImplementation(() => Promise.resolve(failedResponse()));

    const { getByTestId, getByText } = componentWrapper({
      demo: true,
    });
    // Wait till data shows
    await waitForElement(() => getByText('Active'));

    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.STATUS_TOGGLE));
  });
});

describe('New Users', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  beforeEach(() => {
    request.mockImplementation(() => Promise.resolve(responseWithList()));
  });

  afterEach(() => {
    request.mockClear();
  });

  it('Add new users with success', () => {
    request.mockImplementation(() => Promise.resolve(addNewUserSuccess()));

    const { getByTestId, getByPlaceholderText, getByText } = componentWrapper({
      demo: false,
    });
    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.ADD_USER));

    // Update Fields
    fieldUpdateViaPlaceHolder.forEach(d => {
      fireEvent.change(getByPlaceholderText(d.key), {
        target: { value: d.value },
      });
    });
    // Check Elements are showing
    expect(getByText('Add User')).toBeTruthy();
    fireEvent.click(getByText('Add'));
  });

  it('Add new users with success', () => {
    const { getByTestId, getByPlaceholderText, getByText } = componentWrapper({
      demo: true,
    });
    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.ADD_USER));

    // Update Fields
    fieldUpdateViaPlaceHolder.forEach(d => {
      fireEvent.change(getByPlaceholderText(d.key), {
        target: { value: d.value },
      });
    });
    // Check Elements are showing
    expect(getByText('Add User')).toBeTruthy();
    fireEvent.click(getByText('Add'));
  });

  it('Add new user with cancel option', () => {
    request.mockImplementation(() => Promise.resolve(addNewUserSuccess()));

    const { getByTestId } = componentWrapper({ demo: false });
    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.ADD_USER));

    fireEvent.click(getByTestId(TEST_IDS.USER_MODAL_CANCEL));
  });

  it('Add new user with failure', () => {
    request.mockImplementation(() => Promise.reject(addNewUserFailure()));

    const { getByTestId, getByText, getByPlaceholderText } = componentWrapper({
      demo: false,
    });
    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.ADD_USER));

    // Update Fields
    fieldUpdateViaPlaceHolder.forEach(d => {
      fireEvent.change(getByPlaceholderText(d.key), {
        target: { value: d.value },
      });
    });

    // Check Elements are showing
    expect(getByText('Add User')).toBeTruthy();
    fireEvent.click(getByTestId(TEST_IDS.USER_MODAL_OK));
  });
});

describe('Update User', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  beforeEach(() => {
    request.mockImplementation(() => Promise.resolve(responseWithList()));
  });

  afterEach(() => {
    request.mockClear();
  });

  it('Update user with success', async () => {
    request.mockImplementationOnce(() => Promise.resolve(responseWithList()));

    const { getByTestId, getByText, getByPlaceholderText } = componentWrapper({
      demo: false,
    });
    expect(request).toHaveBeenCalledTimes(1);
    await waitForElement(() => getByText('Active'));

    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.EDIT_BUTTON));

    // Update Fields
    fieldUpdateViaPlaceHolder.forEach(d => {
      fireEvent.change(getByPlaceholderText(d.key), {
        target: { value: d.value },
      });
    });

    // Check Elements are showing
    expect(getByText('Update')).toBeTruthy();
    fireEvent.click(getByTestId(TEST_IDS.ADD_USER));
  });

  it('Update user with success', async () => {
    request.mockImplementationOnce(() => Promise.resolve(responseWithList()));

    const { getByTestId, getByText, getByPlaceholderText } = componentWrapper({
      demo: true,
    });
    await waitForElement(() => getByText('Active'));

    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.EDIT_BUTTON));

    // Update Fields
    fieldUpdateViaPlaceHolder.forEach(d => {
      fireEvent.change(getByPlaceholderText(d.key), {
        target: { value: d.value },
      });
    });

    // Check Elements are showing
    expect(getByText('Update')).toBeTruthy();
    fireEvent.click(getByText('Update'));
  });

  it('Update user with cancel', async () => {
    request.mockImplementationOnce(() => Promise.resolve(responseWithList()));

    const { getByTestId, getByText } = componentWrapper({ demo: false });
    expect(request).toHaveBeenCalledTimes(1);
    await waitForElement(() => getByText('Active'));

    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.EDIT_BUTTON));

    // Check Elements are showing
    expect(getByText('Update')).toBeTruthy();
    fireEvent.click(getByTestId(TEST_IDS.USER_MODAL_CANCEL));
  });

  it('User Update failure', async () => {
    request
      .mockImplementationOnce(() => Promise.resolve(responseWithList()))
      .mockImplementationOnce(() => Promise.resolve(addNewUserFailure()));

    const { getByTestId, getByText, getByPlaceholderText } = componentWrapper({
      demo: false,
    });
    expect(request).toHaveBeenCalledTimes(1);
    await waitForElement(() => getByText('Active') || getByText('Suspended'));

    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.EDIT_BUTTON));

    // Update Fields
    fieldUpdateViaPlaceHolder.forEach(d => {
      fireEvent.change(getByPlaceholderText(d.key), {
        target: { value: d.value },
      });
    });

    // Check Elements are showing
    expect(getByText('Update')).toBeTruthy();
    fireEvent.click(getByText('Update'));
  });
});

describe('Status Filter', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  beforeEach(() => {
    request.mockImplementation(() => Promise.resolve(responseWithList()));
  });

  afterEach(() => {
    request.mockClear();
  });

  it('Status Filter', async () => {
    request.mockImplementationOnce(() => Promise.resolve(responseWithList()));

    const { getByText, getByRole } = componentWrapper({
      demo: false,
    });
    await waitForElement(() => getByRole('combobox'));

    fireEvent.mouseDown(getByRole('combobox'));
    fireEvent.change(getByRole('combobox'), {
      target: {
        value: 'Active',
      },
    });
    // .ant-select-item-option-content
    fireEvent.click(
      document.querySelectorAll('.ant-select-item-option-content')[0],
    );
    fireEvent.blur(getByRole('combobox'));
    fireEvent.focus(getByRole('combobox'));

    // Update Fields
    fireEvent.click(getByText('Name'));
  });
});

describe('Search & Sorting user list', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  beforeEach(() => {
    request.mockImplementation(() => Promise.resolve(responseWithList()));
  });

  afterEach(() => {
    request.mockClear();
  });

  it('Sorting user with success', async () => {
    request.mockImplementationOnce(() => Promise.resolve(responseWithList()));

    const { getByText } = componentWrapper({
      demo: false,
    });

    // Update Fields
    fireEvent.click(getByText('Name'));
  });

  it('Search user with success', async () => {
    request.mockImplementationOnce(() => Promise.resolve(responseWithList()));

    componentWrapper({
      demo: false,
    });

    document.querySelectorAll('.ant-input-affix-wrapper')[0].children[0].value =
      'Hello';

    fireEvent.click(document.querySelectorAll('.ant-input-search-button')[0]);
  });

  it('Search user with success', async () => {
    const { getByPlaceholderText } = componentWrapper({});

    // Update Fields
    fireEvent.change(getByPlaceholderText('Search User'), {
      target: { value: 'a' },
    });

    // Update Fields
    fireEvent.change(getByPlaceholderText('Search User'), {
      target: { value: '' },
    });
  });

  it('Sorting', async () => {
    const { getByText } = componentWrapper({});

    // Update Fields
    fireEvent.click(getByText('Name'));
    fireEvent.click(getByText('Name'));
    fireEvent.click(getByText('Name'));
    fireEvent.click(getByText('User Id'));
    fireEvent.click(getByText('User Id'));
    fireEvent.click(getByText('User Id'));
  });
});
