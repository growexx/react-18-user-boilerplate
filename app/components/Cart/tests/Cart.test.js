import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { createMemoryHistory } from 'history';
import products from '../../../examples/Products/stub/product.json';

import Cart from '../index';
import configureStore from '../../../configureStore';

const dummyData = products.products.slice(0, 2);

describe('<Cart />', () => {
  const history = createMemoryHistory();
  const store = configureStore({}, history);

  it('should render a div', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <Cart />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('<Cart />', () => {
  test('display should update Carts', () => {
    window.product = dummyData;
    window.localStorage = {};
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
