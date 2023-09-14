import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { createMemoryHistory } from 'history';
import { store } from 'configureStore';
import products from '../../../examples/Products/stub/product.json';
import Cart from '../index';
// if not using firebase messaging remove this mock
jest.mock('firebase/messaging', () => {
  const actualModule = jest.requireActual('firebase/messaging');
  return {
    ...actualModule,
    onMessage: jest.fn(),
    getMessaging: jest.fn(),
  };
});
const dummyData = products.products.slice(0, 2);

describe('<Cart />', () => {
  const history = createMemoryHistory();

  it('should render a div', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Cart />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('<Cart />', () => {
  test('display should update Carts', () => {
    window.product = dummyData;
    window.localStorage.setItem = (key, value) => {
      window.localStorage[key] = value;
    };
    window.localStorage.getItem = key => window.localStorage[key];
    const { getByTestId } = render(<Cart />);
    window.localStorage.setItem('products', JSON.stringify(dummyData));
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'test_key',
        newValue: 'test_value',
      }),
    );
    fireEvent.click(getByTestId('badge-Cart'));

    expect(getByTestId('badge-cart-drawer')).toBeTruthy();
  });
});
