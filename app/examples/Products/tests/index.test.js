import React from 'react';
import { render } from 'react-testing-library';
import ProductCardPage from '../index';
import { addToCart } from '../utils';
import products from '../stub/product.json';

const dummyData = products.products[0];
const dummyData2 = products.products[1];

describe('<ProductCardPage />', () => {
  test('ProductCardPage should add products to cart', () => {
    const { getByTestId } = render(<ProductCardPage />);
    window.setCount = () => {};
    addToCart(dummyData);
    const productCards = getByTestId('product-col');
    expect(productCards).toBeTruthy();
  });
  test('ProductCardPage should push products to card', () => {
    const { getByTestId } = render(<ProductCardPage />);
    window.setCount = () => {};
    window.product = JSON.stringify([dummyData]);
    addToCart(dummyData2);
    const productCards = getByTestId('product-col');
    expect(productCards).toBeTruthy();
  });
  test('ProductCardPage should push products to card', () => {
    const { getByTestId } = render(<ProductCardPage />);
    window.setCount = () => {};
    window.product = JSON.stringify([dummyData]);
    addToCart(dummyData);
    const productCards = getByTestId('product-col');
    expect(productCards).toBeTruthy();
  });
});
