import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import { TOKEN_KEY } from 'utils/constants';
import StorageService from 'utils/StorageService';
import Login from 'containers/Auth/Login/Loadable';
import request from 'utils/request';
import configureStore from '../../../configureStore';
import RoleMiddleWare from '../RoleMiddleWare';
import { ROLES, ROUTES } from '../../constants';

jest.mock('utils/request');
let store;
const tokenValue = 'test token';
const props = {
  component: Login,
  path: ROUTES.CONNECTED_JIRA,
  showError: true,
};

const mockAPI = response => {
  request.mockImplementationOnce(() =>
    Promise.resolve(
      response || {
        data: {
          role: ROLES.USER,
        },
        status: 1,
      },
    ),
  );
};

const componentWrapper = localProps =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <RoleMiddleWare {...props} {...localProps} />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );

const login = () => StorageService.set(TOKEN_KEY, tokenValue);

describe('<RoleMiddleWare />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
    login();
  });
  afterEach(() => {
    request.mockClear();
  });

  it('should render and match the snapshot', () => {
    mockAPI();
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('show Error false', () => {
    mockAPI();
    props.showError = false;
    const { container } = componentWrapper();
    expect(container).toBeTruthy();
  });

  it('should render and match the snapshot', () => {
    mockAPI();
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });

  it('should render and match the snapshot', () => {
    mockAPI({ status: 1, data: {} });
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });

  it('show Error false', () => {
    mockAPI({ status: 0 });

    props.showError = false;
    const { container } = componentWrapper();
    expect(container).toBeTruthy();
  });

  it('No restriction', () => {
    mockAPI({ status: 0 });

    props.showError = false;
    const { container } = componentWrapper({ path: '/profile' });
    expect(container).toBeTruthy();
  });

  it('Do not have access', () => {
    mockAPI({ status: 1, data: { role: ROLES.USER } });

    props.showError = false;
    const { container } = componentWrapper();
    expect(container).toBeTruthy();
  });

  it('have access', () => {
    mockAPI({ status: 1, data: { role: ROLES.HR } });

    props.showError = false;
    const { container } = componentWrapper();
    expect(container).toBeTruthy();
  });
});
