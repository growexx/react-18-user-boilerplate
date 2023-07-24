import React from 'react';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { HistoryRouter as ConnectedRouter } from 'redux-first-history/rr6';
import { createMemoryHistory } from 'history';
import PasswordChange from '../ResetPassword/PasswordChange';
import configureStore from '../../../configureStore';

describe('<ResetPassword />', () => {
  it('should render an <StyledSecurityQuestion> tag', () => {
    const history = createMemoryHistory();
    const { store } = configureStore({}, history);

    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <PasswordChange />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
