/**
 *
 * Tests for InlineEdit
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import 'jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { browserHistory } from 'react-router-dom';
import history from 'utils/history';
import configureStore from 'configureStore';
import InlineEdit from 'components/InlineEdit/index';
import { TEST_IDS } from 'components/InlineEdit/stub';
let store;
const props = {
  onSave: jest.fn(),
  value: 'testValue',
  placeholder: 'This is test component',
};
const componentWrapper = () =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <InlineEdit {...props} />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );

describe('<InlineEdit />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('Should double click and input box is appeared', () => {
    const { getByTestId } = componentWrapper();
    // show the input
    userEvent.dblClick(getByTestId(TEST_IDS.INPUT_VALUE));
    expect(getByTestId(TEST_IDS.INPUT_EDIT)).toBeInTheDocument();
  });
  it('Should double click and cancel the editing', () => {
    const { getByTestId, getByText } = componentWrapper();
    // show the input
    userEvent.dblClick(getByTestId(TEST_IDS.INPUT_VALUE));
    expect(getByTestId(TEST_IDS.INPUT_EDIT)).toBeInTheDocument();
    fireEvent.change(getByTestId(TEST_IDS.INPUT_EDIT), {
      target: {
        value: 'testInputChanged',
      },
    });
    // cancel the input
    fireEvent.click(getByTestId(TEST_IDS.CANCEL_BUTTON));
    expect(getByText('testValue')).toBeInTheDocument();
  });
  it('Should double click and write in input box', async () => {
    const { getByTestId } = componentWrapper();
    // show the input
    userEvent.dblClick(getByTestId(TEST_IDS.INPUT_VALUE));
    expect(getByTestId(TEST_IDS.INPUT_EDIT)).toBeInTheDocument();
    // write on the input
    fireEvent.change(getByTestId(TEST_IDS.INPUT_EDIT), {
      target: {
        value: 'testInputChanged',
      },
    });
    // save the input
    fireEvent.click(getByTestId(TEST_IDS.SAVE_BUTTON));
    expect(getByTestId(TEST_IDS.INPUT_VALUE)).toBeInTheDocument();
  });
  it('Should double click and press escape', () => {
    props.value = '';
    const { getByTestId, queryByTestId } = componentWrapper();
    // show the input
    userEvent.dblClick(getByTestId(TEST_IDS.INPUT_VALUE));
    expect(getByTestId(TEST_IDS.INPUT_EDIT)).toBeInTheDocument();
    fireEvent.keyDown(getByTestId(TEST_IDS.INPUT_EDIT), {
      keyCode: 27,
    });
    expect(queryByTestId(TEST_IDS.INPUT_VALUE)).toBeInTheDocument();
  });
  it('Should double click and press enter button', () => {
    const { getByTestId, queryByTestId } = componentWrapper();
    // show the input
    userEvent.dblClick(getByTestId(TEST_IDS.INPUT_VALUE));
    expect(getByTestId(TEST_IDS.INPUT_EDIT)).toBeInTheDocument();
    fireEvent.keyDown(getByTestId(TEST_IDS.INPUT_EDIT), {
      keyCode: 13,
    });
    expect(queryByTestId(TEST_IDS.INPUT_VALUE)).toBeInTheDocument();
  });
  it('Should double click and fire mouse down', () => {
    const { getByTestId } = componentWrapper();
    // show the input
    userEvent.dblClick(getByTestId(TEST_IDS.INPUT_VALUE));
    // click on input should not close it
    fireEvent.mouseDown(getByTestId(TEST_IDS.INPUT_EDIT));
    expect(getByTestId(TEST_IDS.INPUT_EDIT)).toBeInTheDocument();
    // click on outside input should close it
    fireEvent.click(getByTestId(TEST_IDS.CANCEL_BUTTON));
    expect(getByTestId(TEST_IDS.INPUT_VALUE)).toBeInTheDocument();
  });
});
