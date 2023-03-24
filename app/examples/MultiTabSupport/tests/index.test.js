import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import configureStore from '../../../configureStore';
import MultiTabSupport from '../index';
import { TEST_IDS } from '../constants';
let store;
global.BroadcastChannel = jest.fn(() => ({
  removeEventListener: jest.fn(),
  addEventListener: jest.fn((name, func) => {
    func({
      data: {
        date: new Date().getTime(),
      },
    });
  }),
  postMessage: jest.fn(),
}));

global.window = Object.assign(global.window, {
  addEventListener: jest.fn((name, func) => {
    func({
      key: 'message',
      newValue: [],
    });
  }),
});

const componentWrapper = () =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <MultiTabSupport />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );
describe('<MultiTabSupport />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
});

describe('<MultiTabSupport /> Test add message and clear local storage', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should add message', () => {
    const { getByTestId } = componentWrapper();

    fireEvent.click(getByTestId(TEST_IDS.ADD_MESSAGE));
  });

  it('Clear local storage', () => {
    const { getByTestId } = componentWrapper();

    fireEvent.click(getByTestId(TEST_IDS.CLEAR_LOCAL_STORAGE));
  });

  it('Clear local storage', () => {
    global.localStorage = jest.fn(() => ({
      getItem: () => '2awd',
      setItem: () => '2awd',
    }));
    const { getByTestId } = componentWrapper();

    fireEvent.click(getByTestId(TEST_IDS.ADD_MESSAGE));
  });
});
