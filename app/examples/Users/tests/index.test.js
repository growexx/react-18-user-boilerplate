/**
 *
 * Tests for Users
 *
 */

import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import history from 'utils/history';
import request from 'utils/request';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import Users, { mapDispatchToProps } from '../index';
import configureStore from '../../../configureStore';
import {
  addNewUserFailure,
  addNewUserSuccess,
  failedResponse,
  responseWithList,
  responseWithZeroList,
  successResponse,
  USER_DATA,
} from '../stub';
import { TEST_IDS } from '../constants';
jest.mock('utils/request');

let globalStore;
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
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <Users {...props} {...updatedProps} />
        </Router>
      </IntlProvider>
    </Provider>,
  );

describe('Check component:<Users /> is rendering properly', () => {
  beforeAll(() => {
    const { store } = configureStore({});
    globalStore = store;
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
    componentWrapper();

    // Fire Event
    fireEvent.click(screen.getAllByText('Add User')[0]);

    // Check Elements are showing
    expect(screen.getAllByText('Add User')[1]).toBeTruthy();

    fireEvent.click(screen.getByTestId(TEST_IDS.ADD_USER));
    fireEvent.click(screen.getByTestId(TEST_IDS.USER_MODAL_CANCEL));
  });

  it('Click Delete: Show Confirmation Modal', async () => {
    const { queryByText, queryAllByTestId } = componentWrapper();

    await waitFor(() => queryByText('Active'));

    // Click Delete Button
    fireEvent.click(queryAllByTestId(TEST_IDS.DELETE_BUTTON)[0]);

    // Check Elements are showing
    expect(queryByText('OK', { trim: true })).toBeTruthy();
  });

  it('Click Delete: Show Confirmation Modal and click confirm', async () => {
    const {
      getAllByTestId,
      getAllByText,
      getByText,
      findByTestId,
    } = componentWrapper();
    await waitFor(() => getAllByText('Active')[0]);

    // Click Delete Button
    fireEvent.click(getAllByTestId(TEST_IDS.DELETE_BUTTON)[0]);

    // Check Elements are showing
    expect(getByText('OK', { trim: true })).toBeTruthy();
    await act(async () =>
      fireEvent.click(await findByTestId(TEST_IDS.DELETE_BUTTON_CONFIRMED)),
    );
  });
});

describe('Check listing of users is rendering properly', () => {
  beforeAll(() => {
    const { store } = configureStore({});
    globalStore = store;
  });

  beforeEach(() => {
    request.mockImplementation(() => Promise.resolve(responseWithZeroList()));
  });

  afterEach(() => {
    request.mockClear();
  });

  it('No Records found for users', async () => {
    request.mockImplementation(() => Promise.resolve(responseWithZeroList()));
    componentWrapper({ demo: false });
    await waitFor(() => document.querySelector('.ant-empty-description'));
    expect(document.querySelector('.ant-empty-description')).toBeTruthy();
  });

  it('Users Listing with few records should be shown', async () => {
    request.mockImplementation(() => Promise.resolve(responseWithList()));
    const { getAllByText } = componentWrapper({ demo: false });
    await waitFor(() => getAllByText('Active')[0]);

    expect(getAllByText('Active')[0]).toBeTruthy();
  });

  it('Users Listing with pagination', async () => {
    request.mockImplementation(() => Promise.resolve(responseWithList()));
    const { getAllByText, getByTitle } = componentWrapper({ demo: false });
    await waitFor(() => getAllByText('Active')[0]);

    // Expand Data
    fireEvent.click(document.querySelectorAll('.ant-table-row-expand-icon')[0]);

    expect(getAllByText('Active')[0]).toBeTruthy();
    fireEvent.click(getByTitle('2'));
  });

  it('Toggle User Status', async () => {
    request.mockImplementation(() => Promise.resolve(responseWithList()));

    const { getAllByText, queryAllByTestId } = componentWrapper({
      demo: false,
    });
    // Wait till data shows
    await waitFor(() => getAllByText('Active')[0]);

    // Fire Event
    await act(async () =>
      fireEvent.click(queryAllByTestId(TEST_IDS.STATUS_TOGGLE)[0]),
    );
  });

  it('Toggle User Status Local', async () => {
    request.mockImplementation(() => Promise.resolve(responseWithList()));

    const { queryAllByTestId, getAllByText } = componentWrapper({
      demo: true,
    });
    // Wait till data shows
    await waitFor(() => getAllByText('Active')[0]);

    // Fire Event
    await act(async () =>
      fireEvent.click(queryAllByTestId(TEST_IDS.STATUS_TOGGLE)[0]),
    );
  });

  it('Click Delete: Show Confirmation Modal and click confirm', async () => {
    request.mockImplementation(() => Promise.resolve(successResponse()));

    const {
      getByTestId,
      getByText,
      getAllByText,
      getAllByTestId,
    } = componentWrapper();
    await waitFor(() => getAllByText('Active')[0]);

    // Click Delete Button
    fireEvent.click(getAllByTestId(TEST_IDS.DELETE_BUTTON)[0]);

    // Check Elements are showing
    expect(getByText('OK', { trim: true })).toBeTruthy();
    fireEvent.click(getByTestId(TEST_IDS.DELETE_CONFIRMATION_CANCEL));
  });

  it('Click Delete: Show Confirmation Modal and click confirm', async () => {
    request.mockImplementation(() => Promise.resolve(failedResponse()));

    const {
      getByText,
      getAllByText,
      getAllByTestId,
      queryAllByTestId,
    } = componentWrapper();
    await waitFor(() => getAllByText('Active'));

    // Click Delete Button
    fireEvent.click(getAllByTestId(TEST_IDS.DELETE_BUTTON)[0]);

    // Check Elements are showing
    expect(getByText('OK', { trim: true })).toBeTruthy();
    // fireEvent.click(getByTestId(TEST_IDS.DELETE_BUTTON_CONFIRMED));
    await act(async () =>
      fireEvent.click(queryAllByTestId(TEST_IDS.DELETE_BUTTON_CONFIRMED)[0]),
    );
  });

  it('Toggle User Status Local', async () => {
    request.mockImplementation(() => Promise.resolve(failedResponse()));

    const { getAllByText, queryAllByTestId } = componentWrapper({
      demo: true,
    });
    // Wait till data shows
    await waitFor(() => getAllByText('Active')[0]);

    // Fire Event
    await act(async () =>
      fireEvent.click(queryAllByTestId(TEST_IDS.STATUS_TOGGLE)[0]),
    );
  });

  it('Failed Users Listing api', async () => {
    request.mockImplementationOnce(() => Promise.reject(failedResponse));
    componentWrapper({ demo: false });
    expect(
      await waitFor(() => document.querySelector('.ant-empty-description')),
    ).toBeTruthy();
  });
});

describe('New Users', () => {
  beforeAll(() => {
    const { store } = configureStore({});
    globalStore = store;
  });

  beforeEach(() => {
    request.mockImplementation(() => Promise.resolve(responseWithList()));
  });

  afterEach(() => {
    request.mockClear();
  });

  it('Add new user with failure', () => {
    request.mockImplementation(() => Promise.reject(addNewUserFailure()));

    const { queryByTestId, getByPlaceholderText } = componentWrapper({
      demo: false,
    });
    // Fire Event
    fireEvent.click(queryByTestId(TEST_IDS.ADD_USER));

    // Update Fields
    fieldUpdateViaPlaceHolder.forEach(d => {
      fireEvent.change(getByPlaceholderText(d.key), {
        target: { value: d.value },
      });
    });

    // Check Elements are showing
    expect(screen.getAllByText('Add User')[0]).toBeTruthy();
    fireEvent.click(queryByTestId(TEST_IDS.USER_MODAL_OK));
  });

  it('Add new users with success', () => {
    request.mockImplementation(() => Promise.resolve(addNewUserSuccess()));

    const { getByPlaceholderText, getByText } = componentWrapper({
      demo: false,
    });
    // Fire Event
    fireEvent.click(screen.getAllByText('Add User')[0]);

    // Update Fields
    fieldUpdateViaPlaceHolder.forEach(d => {
      fireEvent.change(getByPlaceholderText(d.key), {
        target: { value: d.value },
      });
    });
    // Check Elements are showing
    expect(screen.getAllByText('Add User')[0]).toBeTruthy();
    fireEvent.click(getByText('Add'));
  });

  it('Add new users with success', () => {
    const { getByPlaceholderText, getByText } = componentWrapper({
      demo: true,
    });
    // Fire Event
    fireEvent.click(screen.getAllByText('Add User')[0]);

    // Update Fields
    fieldUpdateViaPlaceHolder.forEach(d => {
      fireEvent.change(getByPlaceholderText(d.key), {
        target: { value: d.value },
      });
    });
    // Check Elements are showing
    expect(screen.getAllByText('Add User')[0]).toBeTruthy();
    fireEvent.click(getByText('Add'));
  });

  it('Add new user with cancel option', async () => {
    request.mockImplementation(() => Promise.resolve(addNewUserSuccess()));

    const { queryByTestId, findByTestId } = componentWrapper({ demo: false });
    // Fire Event
    fireEvent.click(queryByTestId(TEST_IDS.ADD_USER));

    await act(async () =>
      fireEvent.click(await findByTestId(TEST_IDS.USER_MODAL_CANCEL)),
    );
  });
});

describe('Update User', () => {
  beforeAll(() => {
    const { store } = configureStore({});
    globalStore = store;
  });

  beforeEach(() => {
    request.mockImplementation(() => Promise.resolve(responseWithList()));
  });

  afterEach(() => {
    request.mockClear();
  });

  it('Update user with success', async () => {
    request.mockImplementationOnce(() => Promise.resolve(responseWithList()));

    const {
      getByText,
      getByPlaceholderText,
      getAllByText,
      queryAllByTestId,
      findByTestId,
    } = componentWrapper({
      demo: false,
    });
    expect(request).toHaveBeenCalledTimes(1);
    await waitFor(() => getAllByText('Active')[0]);

    // Fire Event
    await act(async () =>
      fireEvent.click(queryAllByTestId(TEST_IDS.EDIT_BUTTON)[0]),
    );

    // Update Fields
    fieldUpdateViaPlaceHolder.forEach(d => {
      fireEvent.change(getByPlaceholderText(d.key), {
        target: { value: d.value },
      });
    });

    // Check Elemen ts are showing
    expect(getByText('Update')).toBeTruthy();
    await act(async () =>
      fireEvent.click(await findByTestId(TEST_IDS.ADD_USER)),
    );
  });

  it('Update user with success', async () => {
    request.mockImplementationOnce(() => Promise.resolve(responseWithList()));

    const {
      getByText,
      getByPlaceholderText,
      getAllByText,
      queryAllByTestId,
      findByText,
    } = componentWrapper({
      demo: true,
    });
    await waitFor(() => getAllByText('Active')[0]);

    // Fire Event
    await act(async () =>
      fireEvent.click(queryAllByTestId(TEST_IDS.EDIT_BUTTON)[0]),
    );

    // Update Fields
    fieldUpdateViaPlaceHolder.forEach(d => {
      fireEvent.change(getByPlaceholderText(d.key), {
        target: { value: d.value },
      });
    });

    // Check Elements are showing
    expect(getByText('Update')).toBeTruthy();
    await act(async () => fireEvent.click(await findByText('Update')));
  });

  it('Update user with cancel', async () => {
    request.mockImplementationOnce(() => Promise.resolve(responseWithList()));

    const {
      queryByTestId,
      getByText,
      getAllByText,
      queryAllByTestId,
    } = componentWrapper({
      demo: false,
    });
    expect(request).toHaveBeenCalledTimes(1);
    await waitFor(() => getAllByText('Active')[0]);

    // Fire Event
    await act(async () =>
      fireEvent.click(queryAllByTestId(TEST_IDS.EDIT_BUTTON)[0]),
    );

    // Check Elements are showing
    expect(getByText('Update')).toBeTruthy();
    fireEvent.click(queryByTestId(TEST_IDS.USER_MODAL_CANCEL));
  });

  it('User Update failure', async () => {
    request
      .mockImplementationOnce(() => Promise.resolve(responseWithList()))
      .mockImplementationOnce(() => Promise.resolve(addNewUserFailure()));

    const {
      getByText,
      getByPlaceholderText,
      getAllByText,
      queryAllByTestId,
    } = componentWrapper({
      demo: false,
    });
    expect(request).toHaveBeenCalledTimes(1);
    await waitFor(
      () => getAllByText('Active')[0] || getAllByText('Suspended')[0],
    );

    // Fire Event
    await act(async () =>
      fireEvent.click(queryAllByTestId(TEST_IDS.EDIT_BUTTON)[0]),
    );
    // Update Fields
    fieldUpdateViaPlaceHolder.forEach(d => {
      fireEvent.change(getByPlaceholderText(d.key), {
        target: { value: d.value },
      });
    });

    // Check Elements are showing
    expect(getByText('Update')).toBeTruthy();
    fireEvent.click(getByText('Update'));
    await act(async () => fireEvent.click(getByText('Update')));
  });
});

describe('Status Filter', () => {
  beforeAll(() => {
    const { store } = configureStore({});
    globalStore = store;
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
    await waitFor(() => getByRole('combobox'));

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
    const { store } = configureStore({});
    globalStore = store;
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
