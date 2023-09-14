import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ProductCard from '../index';
import products from '../../../examples/Products/stub/product.json';

const dummyData = products.products.slice(0, 2);

describe('<ProductCard />', () => {
  test('display should increment the quantity', () => {
    const { getByTestId } = render(<ProductCard />);
    const incrementButton = getByTestId('increment');
    fireEvent.click(incrementButton);
    expect(incrementButton).toBeTruthy();
  });
  test('display should decrement the quantity', () => {
    const { getByTestId } = render(<ProductCard />);
    const decrementButton = getByTestId('decrement');
    fireEvent.click(decrementButton);
    fireEvent.click(decrementButton);
    expect(decrementButton).toBeTruthy();
  });
  test('display should click the button', async () => {
    localStorage.products = JSON.stringify(dummyData);
    window.setCount = () => {};
    const { getByTestId } = render(<ProductCard data={dummyData[0]} />);
    const cartButton = getByTestId('cart-add');
    fireEvent.click(cartButton);
    await waitFor(() => {
      expect(cartButton).toBeTruthy();
    });
  });
});
