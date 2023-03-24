import { message } from 'antd';

export const addToCart = product => {
  const productData = localStorage.products;
  const parsedProductData = productData ? JSON.parse(productData) : [];
  const productList = parsedProductData;
  if (!localStorage.products) {
    productList.push(product);
  } else {
    const presentProduct = productList.find(
      cartProduct => cartProduct.id === product.id,
    );
    if (!presentProduct) {
      productList.push(product);
    } else {
      message.warning(`${product.title} already present in cart.`);
      return;
    }
  }
  localStorage.setItem('products', JSON.stringify(productList));
  window.product = productList;
  message.success(`${product.title} successfully added to cart.`);
  window.setCount(productList.length);
};
