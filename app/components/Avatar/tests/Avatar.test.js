import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { createMemoryHistory } from 'history';
import { store } from 'configureStore';
import Avatar from '../index';

describe('<Avatar />', () => {
  const stubProps = {
    menu: [
      {
        to: '/profile',
        tabName: 'Profile',
        icon: 'testIcon',
      },
    ],
  };
  const history = createMemoryHistory();

  it('should render a div', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Avatar {...stubProps} />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
