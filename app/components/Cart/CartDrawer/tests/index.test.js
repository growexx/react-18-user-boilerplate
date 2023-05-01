import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CartDrawer from '../index';
import products from '../../../../examples/Products/stub/product.json';

const mockFunction = () => {};
const dummyData = products.products.slice(0, 2);
describe('<CartDrawer />', () => {
  test('display should delete product', async () => {
    window.product = dummyData;
    window.localStorage = {};
    window.setCount = mockFunction;
    window.localStorage.setItem = (key, value) => {
      window.localStorage[key] = value;
    };
    window.localStorage.getItem = key => window.localStorage[key];
    const { getAllByTestId, getAllByRole, getByText } = render(
      <CartDrawer visible setVisible={mockFunction} />,
    );
    window.localStorage.setItem('products', JSON.stringify(dummyData));
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'test_key',
        newValue: 'test_value',
      }),
    );
    fireEvent.click(getAllByTestId('product-delete')[0]);
    fireEvent.click(getAllByRole('img')[0]);
    expect(getByText('Product Deleted Successfully from cart')).toBeTruthy();
  });
});
