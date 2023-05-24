import React from 'react';
import { act, render } from '@testing-library/react';
import ProductCardPage from '../index';
import { addToCart } from '../utils';
import products from '../stub/product.json';

const dummyData = products.products[0];
const dummyData2 = products.products[1];

describe('<ProductCardPage />', () => {
  test('ProductCardPage should add products to cart', async () => {
    const { getAllByTestId } = render(<ProductCardPage />);
    await act(() => {
      window.setCount = () => {};
      addToCart(dummyData);
    });
    const productCards = getAllByTestId('product-col')[0];
    expect(productCards).toBeTruthy();
  });
  test('ProductCardPage should push products to card', async () => {
    const { getAllByTestId } = render(<ProductCardPage />);
    await act(() => {
      window.setCount = () => {};
      window.product = JSON.stringify([dummyData]);
      addToCart(dummyData2);
    });
    const productCards = getAllByTestId('product-col')[0];
    expect(productCards).toBeTruthy();
  });
  test('ProductCardPage should push products to card', async () => {
    const { getAllByTestId } = render(<ProductCardPage />);
    await act(() => {
      window.setCount = () => {};
      window.product = JSON.stringify([dummyData]);
      addToCart(dummyData);
    });
    const productCards = getAllByTestId('product-col')[0];
    expect(productCards).toBeTruthy();
  });
});
