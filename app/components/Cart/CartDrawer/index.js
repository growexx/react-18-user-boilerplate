import {
  Affix,
  Avatar,
  Button,
  Col,
  Divider,
  Drawer,
  List,
  message,
  Row,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DollarCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;
const CartDrawer = ({ visible, setVisible }) => {
  const [productsData, setProductsData] = useState(window.product || []);
  useEffect(() => {
    setProductsData(window.product || []);
  }, [window.product]);
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(productsData));
  }, [productsData]);
  useEffect(() => {
    window.addEventListener('storage', () => {
      setProductsData(JSON.parse(localStorage.getItem('products')) || []);
    });
    return () => {
      window.removeEventListener('storage', window);
    };
  }, []);
  const onDeleteClick = id => {
    const filterProductsData = productsData.filter(
      product => product.id !== id,
    );
    window.setCount(filterProductsData.length);
    setProductsData(filterProductsData);
    message.success('Product Deleted Successfully from cart');
  };

  const onCloseHandler = () => {
    setVisible(false);
  };

  const total = productsData
    .map(product => product.price)
    .reduce((a, b) => a + b, 0);
  return (
    <Drawer
      title="Product Cart"
      placement="right"
      closable
      onClose={onCloseHandler}
      visible={visible}
      width="320"
      data-testid="drawer"
    >
      <List
        itemLayout="vertical"
        dataSource={productsData}
        renderItem={product => (
          <List.Item key={product.id}>
            <List.Item.Meta
              avatar={<Avatar src={product.imageUrl} />}
              title={
                <div className="u-d-flex u-align-items-center u-justify-content-between">
                  {product.title}
                  <div className="u-d-flex u-align-items-center">
                    <DollarCircleOutlined className="u-mr-1" />
                    {product.price}
                  </div>
                </div>
              }
              description={product.description}
            />
            <Row>
              <Col span={4} />
              <Col span={20}>
                <div className="u-d-flex u-justify-content-between">
                  <Text type="secondary">Product Qty:</Text>
                  <Text>{product.qty}</Text>
                </div>
              </Col>
              <Col span={4} className="u-mt-2" />
              <Col span={20} className="u-mt-2">
                <Button
                  size="small"
                  onClick={() => onDeleteClick(product.id)}
                  data-testid="product-delete"
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
      <Affix offsetBottom={0}>
        <div>
          <Divider />

          <div className="u-d-flex u-justify-content-between">
            <Text>Total Payable Amount:</Text>
            <Text className="u-d-flex u-align-items-center">
              <DollarCircleOutlined className="u-mr-2" />
              {total}
            </Text>
          </div>
        </div>
      </Affix>
    </Drawer>
  );
};

CartDrawer.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
};
export default CartDrawer;
