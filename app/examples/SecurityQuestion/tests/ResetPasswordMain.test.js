import React from 'react';
import renderer from 'react-test-renderer';
import { render } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import 'jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { HistoryRouter as ConnectedRouter } from 'redux-first-history/rr6';
import { createMemoryHistory } from 'history';
import PasswordChange from '../ResetPassword/PasswordChange';
import configureStore from '../../../configureStore';

import ResetPasswordMain from '../ResetPassword/ResetPasswordMain';

describe('SampleComponent', () => {
  test('should render', () => {
    const component = renderer
      .create(
        <IntlProvider locale="en">
          <MemoryRouter>
            <ResetPasswordMain />
          </MemoryRouter>
        </IntlProvider>,
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });
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
