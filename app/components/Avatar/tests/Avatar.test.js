import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { createMemoryHistory } from 'history';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import Avatar, { getNewMenu, returnItems } from '../index';
import configureStore from '../../../configureStore';

describe('<Avatar />', () => {
  const stubProps = {
    menu: [
      {
        to: '/profile',
        tabName: 'Profile',
      },
      {
        to: '/change-password',
        tabName: 'Change Password',
      },
      {
        to: '/logout',
        tabName: 'Logout',
      },
    ],
  };
  const history = createMemoryHistory();
  const { store } = configureStore({}, history);

  it('should render a div', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Avatar menu={stubProps} />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should returnItems and getNewMenu', () => {
    const items = [
      {
        to: '/profile',
        tabName: 'Profile',
      },
      {
        to: '/change-password',
        tabName: 'Change Password',
      },
    ];
    const currReturnItems = returnItems(items);
    const currGetNewMenu = getNewMenu(items);
    expect(currReturnItems).toBeTruthy();
    expect(currGetNewMenu).toBeTruthy();
  });
});
