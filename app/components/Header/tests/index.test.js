import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { store, history } from 'configureStore';
import Header from '../index';
import { StyledAppHeader } from '../StyledAppHeader';

jest.mock('firebase/messaging', () => {
  const actualModule = jest.requireActual('firebase/messaging');
  return {
    ...actualModule,
    onMessage: jest.fn(),
    getMessaging: jest.fn(),
  };
});

describe('<Header />', () => {
  it('should render a div', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Header />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render a div with props', () => {
    render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Header menuBackground />
          </Router>
        </IntlProvider>
      </Provider>,
    );
  });

  it('should render a div with props', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <StyledAppHeader menuBackground />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render a div with props', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <StyledAppHeader />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
