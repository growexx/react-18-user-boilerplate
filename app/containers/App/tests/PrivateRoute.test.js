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
import configureStore from '../../../configureStore';
import PrivateRoute from '../PrivateRoute';

jest.mock('utils/Helper');

let store;
const tokenValue = 'test token';
const props = {
  component: Login,
  path: '/admin',
  showError: true,
};
const componentWrapper = () =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <PrivateRoute {...props} />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );

const login = () => StorageService.set(TOKEN_KEY, tokenValue);

describe('<PrivateRoute />', () => {
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
  it('show Error false', () => {
    props.showError = false;
    const { container } = componentWrapper();
    expect(container).toBeTruthy();
  });
});
