/**
 *
 * Tests for Profile
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
/**
 * user-event is a companion library for Testing Library
 * that provides more advanced simulation of browser
 * interactions than the built-in fireEvent method
 * https://testing-library.com/docs/ecosystem-user-event/
 */
import userEvent from '@testing-library/user-event';
/**
 * This import adds some helpful assertions.
 * Custom jest matchers to test the state of the DOM
 * https://github.com/testing-library/jest-dom
 */
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { TEST_IDS } from 'components/InlineEdit/stub';
import history from 'utils/history';
import { store } from 'configureStore';
import Profile from '../index';
import { DATA_TEST_IDS } from '../constants';
jest.mock('draft-js/lib/generateRandomKey', () => jest.fn(() => '123'));
jest.mock('components/ImageUpload/Loadable');

const user = userEvent.setup();
let globalStore;

const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <Profile />
        </Router>
      </IntlProvider>
    </Provider>,
  );

describe('<Profile />', () => {
  beforeAll(() => {
    globalStore = store;
  });
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('Should click Save Buttons', () => {
    const { getByTestId } = componentWrapper();
    fireEvent.click(getByTestId(DATA_TEST_IDS.ABOUT_EDIT));
    fireEvent.click(getByTestId(DATA_TEST_IDS.ABOUT_SAVE));
    expect(getByTestId(DATA_TEST_IDS.ABOUT_EDIT)).toBeTruthy();
    fireEvent.click(getByTestId(DATA_TEST_IDS.EXPERIENCE_EDIT));
    fireEvent.click(getByTestId(DATA_TEST_IDS.EXPERIENCE_SAVE));
    expect(getByTestId(DATA_TEST_IDS.EXPERIENCE_EDIT)).toBeTruthy();
    fireEvent.click(getByTestId(DATA_TEST_IDS.EDUCATION_EDIT));
    fireEvent.click(getByTestId(DATA_TEST_IDS.EDUCATION_SAVE));
    expect(getByTestId(DATA_TEST_IDS.EDUCATION_EDIT)).toBeTruthy();
    fireEvent.click(getByTestId(DATA_TEST_IDS.LICENSEANDCERTIFICATION_EDIT));
    fireEvent.click(getByTestId(DATA_TEST_IDS.LICENSEANDCERTIFICATION_SAVE));
    expect(
      getByTestId(DATA_TEST_IDS.LICENSEANDCERTIFICATION_EDIT),
    ).toBeTruthy();
  });
  it('Should double click on name and write in input box', async () => {
    const { getAllByTestId } = componentWrapper();
    // show the input
    await user.dblClick(getAllByTestId(TEST_IDS.INPUT_VALUE)[0]);
    expect(getAllByTestId(TEST_IDS.INPUT_EDIT)[0]).toBeInTheDocument();
    // write on the input
    fireEvent.change(getAllByTestId(TEST_IDS.INPUT_EDIT)[0], {
      target: {
        value: 'testInputChanged',
      },
    });
    // save the input
    fireEvent.click(getAllByTestId(TEST_IDS.SAVE_BUTTON)[0]);
    expect(getAllByTestId(TEST_IDS.INPUT_VALUE)[0]).toBeInTheDocument();
  });
  it('Should double click on designation and write in input box', async () => {
    const { getAllByTestId } = componentWrapper();
    // show the input
    await user.dblClick(getAllByTestId(TEST_IDS.INPUT_VALUE)[1]);
    expect(getAllByTestId(TEST_IDS.INPUT_EDIT)[0]).toBeInTheDocument();
    // write on the input
    fireEvent.change(getAllByTestId(TEST_IDS.INPUT_EDIT)[0], {
      target: {
        value: 'testInputChanged',
      },
    });
    // save the input
    fireEvent.click(getAllByTestId(TEST_IDS.SAVE_BUTTON)[0]);
    expect(getAllByTestId(TEST_IDS.INPUT_VALUE)[1]).toBeInTheDocument();
  });
  it('Should double click on location and write in input box', async () => {
    const { getAllByTestId } = componentWrapper();
    // show the input
    await user.dblClick(getAllByTestId(TEST_IDS.INPUT_VALUE)[2]);
    expect(getAllByTestId(TEST_IDS.INPUT_EDIT)[0]).toBeInTheDocument();
    // write on the input
    fireEvent.change(getAllByTestId(TEST_IDS.INPUT_EDIT)[0], {
      target: {
        value: 'testInputChanged',
      },
    });
    // save the input
    fireEvent.click(getAllByTestId(TEST_IDS.SAVE_BUTTON)[0]);
    expect(getAllByTestId(TEST_IDS.INPUT_VALUE)[2]).toBeInTheDocument();
  });
  it('Should fire mouse down on other target and input should be disappeared', async () => {
    const { getAllByTestId } = componentWrapper();
    // show the input
    await user.dblClick(getAllByTestId(TEST_IDS.INPUT_VALUE)[2]);
    expect(getAllByTestId(TEST_IDS.INPUT_EDIT)[0]).toBeInTheDocument();
    fireEvent.mouseDown(getAllByTestId(TEST_IDS.INPUT_VALUE)[0]);
    expect(getAllByTestId(TEST_IDS.INPUT_VALUE)).toHaveLength(2);
  });
});
