import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { store } from 'configureStore';
import ReposList from '../index';

// if not using firebase messaging remove this mock
jest.mock('firebase/messaging', () => {
  const actualModule = jest.requireActual('firebase/messaging');
  return {
    ...actualModule,
    onMessage: jest.fn(),
    getMessaging: jest.fn(),
  };
});

describe('<ReposList />', () => {
  it('should render the loading indicator when its loading', () => {
    const { container } = render(<ReposList loading />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render an error if loading failed', () => {
    const { queryByText } = render(
      <IntlProvider locale="en">
        <ReposList loading={false} error={{ message: 'Loading failed!' }} />
      </IntlProvider>,
    );
    expect(queryByText(/Something went wrong/)).not.toBeNull();
  });

  it('should render the repositories if loading was successful', () => {
    const repos = [
      {
        owner: {
          login: 'mxstbr',
        },
        html_url: 'https://github.com/react-boilerplate/react-boilerplate',
        name: 'react-boilerplate',
        open_issues_count: 20,
        full_name: 'react-boilerplate/react-boilerplate',
      },
    ];
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ReposList repos={repos} error={false} />
        </IntlProvider>
      </Provider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not render anything if nothing interesting is provided', () => {
    const { container } = render(
      <ReposList repos={false} error={false} loading={false} />,
    );

    expect(container.firstChild).toBeNull();
  });
});
