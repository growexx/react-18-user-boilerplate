/**
 * Cart/index.js
 *
 * This is the Cart Component file.
 */
import React, { useEffect, useState } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button } from 'antd';
import CartDrawer from './CartDrawer';

const Cart = () => {
  const productCount = JSON.parse(localStorage.products || '[]').length;
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(productCount);
  const onClickHandler = () => {
    setVisible(true);
  };

  useEffect(() => {
    window.setCount = setCount;
    window.addEventListener('storage', () => {
      setCount(JSON.parse(localStorage.getItem('products')).length || []);
    });
    return () => {
      window.removeEventListener('storage', window);
    };
  }, []);

  useEffect(() => {
    setCount((window.product || []).length);
  }, [window.product]);
  return (
    <>
      <div className="u-mr-1 u-d-inline-block">
        <Button
          onClick={onClickHandler}
          type="text"
          data-testid="badge-Cart"
          className="btn-hover-none p-4"
        >
          <Badge count={count} size="small">
            <ShoppingCartOutlined className="u-font-size-xlg" />
          </Badge>
        </Button>
      </div>
      <div data-testid="badge-cart-drawer" data-visible={visible}>
        <CartDrawer visible={visible} setVisible={setVisible} />
      </div>
    </>
  );
};
export default Cart;
