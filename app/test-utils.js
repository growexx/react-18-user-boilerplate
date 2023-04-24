import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { ROUTES } from './containers/constants';

const AllTheProviders = ({ children }) => {
  return (
    <Provider theme="light">
      <IntlProvider locale="en">
        <MemoryRouter initialEntries={[ROUTES.HOME]}>{children}</MemoryRouter>
      </IntlProvider>
    </Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
