import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import CartDrawer from '../index';
import products from '../../../../examples/Products/stub/product.json';

const mockFunction = () => {};
const dummyData = products.products.slice(0, 2);
describe('<CartDrawer />', () => {
  test('display should delete product', () => {
    window.product = dummyData;
    window.localStorage = {};
    window.setCount = mockFunction;
    window.localStorage.setItem = (key, value) => {
      window.localStorage[key] = value;
    };
    window.localStorage.getItem = key => window.localStorage[key];
    const { getByTestId, getByRole } = render(
      <CartDrawer visible setVisible={mockFunction} />,
    );
    window.localStorage.setItem('products', JSON.stringify(dummyData));
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'test_key',
        newValue: 'test_value',
      }),
    );
    fireEvent.click(getByTestId('product-delete'));
    fireEvent.click(getByRole('img'));
    expect(getByTestId('drawer')).toBeTruthy();
  });
});
