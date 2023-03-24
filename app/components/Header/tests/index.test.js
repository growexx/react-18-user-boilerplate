import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { createMemoryHistory } from 'history';

import Header from '../index';
import { StyledAppHeader } from '../StyledAppHeader';
import configureStore from '../../../configureStore';

describe('<Header />', () => {
  const history = createMemoryHistory();
  const store = configureStore({}, history);

  it('should render a div', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <Header />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render a div with props', () => {
    render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <Header menuBackground />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );
  });

  it('should render a div with props', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <StyledAppHeader menuBackground />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render a div with props', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <StyledAppHeader />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
