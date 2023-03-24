import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Emitter from 'utils/events';
import history from 'utils/history';
import { TOKEN_KEY, EMITTER_EVENTS } from 'utils/constants';
import StorageService from 'utils/StorageService';
import MainLayout from '../index';
import configureStore from '../../../configureStore';

let store;
const tokenValue = 'test token';
const componentWrapper = props =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <MainLayout {...props} />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );

const login = () => StorageService.set(TOKEN_KEY, tokenValue);
const logout = () => StorageService.clear();

describe('<MainLayout />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
    login();
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('should render Div', () => {
    const { container } = componentWrapper();
    const element = container.firstElementChild;
    expect(element.tagName).toEqual('DIV');
  });
  it('should display MenuFoldOutlined icon', () => {
    const { getByTestId } = componentWrapper();
    const element = getByTestId('ToggleIcon');
    fireEvent.click(element);
    expect(element.tagName).toEqual('SPAN');
  });
  it('renders routes file without login', () => {
    logout();
    const { getByTestId } = componentWrapper();
    const element = getByTestId('AppRoutes');
    expect(element.tagName).toEqual('DIV');
  });
  it('emitter events', () => {
    const { container } = componentWrapper();
    Emitter.emit(EMITTER_EVENTS.LOG_IN);
    Emitter.emit(EMITTER_EVENTS.LOG_OUT);
    expect(container.firstChild.tagName).toEqual('DIV');
  });
});

describe('<MainLayout />', () => {
  beforeEach(() => {
    store = configureStore({}, browserHistory);
    login();
    const OLD_ENV = process.env;
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV, NODE_ENV: 'production' }; // Make a copy
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('should render Div', () => {
    const { container } = componentWrapper();
    const element = container.firstElementChild;
    expect(element.tagName).toEqual('DIV');
  });
  it('should display MenuFoldOutlined icon', () => {
    const { getByTestId } = componentWrapper();
    const element = getByTestId('ToggleIcon');
    fireEvent.click(element);
    expect(element.tagName).toEqual('SPAN');
  });
  it('renders routes file without login', () => {
    logout();
    const { getByTestId } = componentWrapper();
    const element = getByTestId('AppRoutes');
    expect(element.tagName).toEqual('DIV');
  });
  it('emitter events', () => {
    const { container } = componentWrapper();
    Emitter.emit(EMITTER_EVENTS.LOG_IN);
    Emitter.emit(EMITTER_EVENTS.LOG_OUT);
    expect(container.firstChild.tagName).toEqual('DIV');
  });
});

describe('<MainLayout /> with variant 2', () => {
  const props = {
    defaultLayout: 2,
  };
  beforeEach(() => {
    store = configureStore({}, browserHistory);
    login();
    const OLD_ENV = process.env;
    // Most important - it clears the cache
    jest.resetModules();
    process.env = { ...OLD_ENV, NODE_ENV: 'production' }; // Make a copy
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper(props);
    expect(firstChild).toMatchSnapshot();
  });
  it('should render Div', () => {
    const { container } = componentWrapper(props);
    const element = container.firstElementChild;
    expect(element.tagName).toEqual('DIV');
  });
  it('renders routes file without login', () => {
    logout();
    const { getByTestId } = componentWrapper(props);
    const element = getByTestId('AppRoutes');
    expect(element.tagName).toEqual('DIV');
  });
  it('emitter events', () => {
    const { container } = componentWrapper(props);
    Emitter.emit(EMITTER_EVENTS.LOG_IN);
    Emitter.emit(EMITTER_EVENTS.LOG_OUT);
    expect(container.firstChild.tagName).toEqual('DIV');
  });
});

describe('<MainLayout /> with variant 3', () => {
  const props = {
    defaultLayout: 3,
  };
  beforeEach(() => {
    store = configureStore({}, browserHistory);
    login();
    const OLD_ENV = process.env;
    // Most important - it clears the cache
    jest.resetModules();
    process.env = { ...OLD_ENV, NODE_ENV: 'production' }; // Make a copy
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper(props);
    expect(firstChild).toMatchSnapshot();
  });
  it('should render Div', () => {
    const { container } = componentWrapper(props);
    const element = container.firstElementChild;
    expect(element.tagName).toEqual('DIV');
  });
  it('renders routes file without login', () => {
    logout();
    const { getByTestId } = componentWrapper(props);
    const element = getByTestId('AppRoutes');
    expect(element.tagName).toEqual('DIV');
  });
  it('emitter events', () => {
    const { container } = componentWrapper(props);
    Emitter.emit(EMITTER_EVENTS.LOG_IN);
    Emitter.emit(EMITTER_EVENTS.LOG_OUT);
    expect(container.firstChild.tagName).toEqual('DIV');
  });
});
