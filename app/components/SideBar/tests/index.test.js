import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import SideBar from '../index';
import configureStore from '../../../configureStore';
let store;
const props = {
  user: {
    role: 1,
  },
  collapsed: true,
};
const componentWrapper = () =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <SideBar {...props} />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );

describe('<SideBar />', () => {
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
