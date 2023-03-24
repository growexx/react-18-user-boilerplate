import React, { useState, useEffect } from 'react';
import {
  Card,
  Avatar,
  Button,
  Carousel,
  Input,
  Row,
  Col,
  Typography,
  Divider,
} from 'antd';
import {
  ShoppingCartOutlined,
  DollarCircleOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { addToCart } from '../../examples/Products/utils';

const { Meta } = Card;
const { Text, Title } = Typography;

const ProductCard = ({ data }) => {
  const { id, title, description, imageUrl, price = 0, qty = 0 } = data || {};
  const [counter, setCounter] = useState(qty);
  const incrementCounter = () => setCounter(counter + 1);
  const decrementCounter = () => setCounter(counter - 1);

  const onClick = product => {
    addToCart(product);
  };
  useEffect(() => {
    if (counter <= 1) {
      setCounter(1);
    }
  }, [counter]);

  return (
    <Card
      id={id}
      cover={
        <Carousel dots={false} arrows>
          <img alt={title} src={imageUrl} />

          <img alt={title} src={imageUrl} />

          <img alt={title} src={imageUrl} />

          <img alt={title} src={imageUrl} />
        </Carousel>
      }
      actions={[
        <Button
          block
          size="large"
          type="primary"
          data-testid="cart-add"
          onClick={() =>
            onClick({ ...data, qty: counter, price: counter * data.price })
          }
        >
          <div className="u-d-flex u-justify-content-center u-align-items-center">
            <ShoppingCartOutlined className="u-mr-2 u-font-size-xlg" />
            Add To Cart
          </div>
        </Button>,
      ]}
    >
      <Meta
        avatar={<Avatar src={imageUrl} />}
        title={
          <div className="u-d-flex u-align-items-center u-justify-content-between">
            {title}
            <div className="u-d-flex u-align-items-center">
              <DollarCircleOutlined className="u-mr-1" />
              {price}
            </div>
          </div>
        }
        description={description}
      />

      <Row>
        <Col span={4} />
        <Col span={24} md={20}>
          <Divider />
          <div className="u-d-flex u-align-items-center u-mt-4 u-justify-content-between">
            <Text type="secondary">Product Quantity:</Text>
            <div className="u-d-flex u-align-items-center">
              <Button
                type="primary"
                size="small"
                icon={<MinusOutlined />}
                onClick={decrementCounter}
                className="lh-6"
                data-testid="decrement"
              />
              <Input
                value={counter}
                size="small"
                style={{ width: 35, textAlign: 'center' }}
              />
              <Button
                type="primary"
                onClick={incrementCounter}
                size="small"
                icon={<PlusOutlined />}
                className="lh-6"
                data-testid="increment"
              />
            </div>
          </div>
        </Col>
        <Col span={4} className="u-mt-5" />
        <Col span={24} md={20} className="u-mt-5 ">
          <div className="u-d-flex u-justify-content-between">
            <Text type="secondary">Total:</Text>
            <Title level={5} className="u-d-flex u-align-items-center u-mt-0">
              <DollarCircleOutlined className="u-mr-1" />
              {price * counter}
            </Title>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
ProductCard.propTypes = {
  data: PropTypes.object,
};
export default ProductCard;
