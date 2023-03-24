import React from 'react';
import { Row, Col } from 'antd';
import products from './stub/product.json';
import ProductCard from '../../components/ProductCard';

function ProductCardPage() {
  return (
    <Row gutter={[40, 40]}>
      {products.products.map(product => (
        <Col
          key={product.id}
          span={24}
          md={12}
          lg={8}
          data-testid="product-col"
        >
          <ProductCard data={product} />
        </Col>
      ))}
    </Row>
  );
}

export default ProductCardPage;
