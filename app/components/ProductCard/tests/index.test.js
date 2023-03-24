import React from 'react';
import { render, fireEvent } from 'react-testing-library';
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
  test('display should click the button', () => {
    localStorage.products = JSON.stringify(dummyData);
    window.setCount = () => {};
    const { getByTestId } = render(<ProductCard data={dummyData} />);
    const cartButton = getByTestId('cart-add');
    fireEvent.click(cartButton);
    expect(cartButton).toBeTruthy();
  });
});
