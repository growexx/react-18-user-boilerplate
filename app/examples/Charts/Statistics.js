import React, { useState, useEffect } from 'react';
import { Row, Statistic, Skeleton, Space, Col, Popover, Tag } from 'antd';
import styled from 'styled-components';

const SpaceContainer = styled(Space)`
  justify-content: space-between;
  width: 100%;

  .ant-statistic-content {
    @media all and (min-width: 768px) and (max-width: 1024px) {
      font-size: 23px;
    }

    @media all and (min-width: 480px) and (max-width: 768px) {
      font-size: 20px;
    }

    @media all and (max-width: 480px) {
      font-size: 17px;
    }
  }
`;

function Statistics() {
  const [isLoading, setIsLoading] = useState(true);
  const [users] = useState(new Date().getTime().toString().slice(5));
  const [earning] = useState(new Date().getTime().toString().slice(5));
  const [payouts] = useState({
    paid: new Date().getTime().toString().slice(5),
    total: new Date().getTime().toString().slice(5),
    pending: new Date().getTime().toString().slice(5),
  });

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <Row className="d-flex justify-content-around flex-row w-100">
      {!isLoading ? (
        <SpaceContainer className="d-flex justify-content-around flex-row w-100">
          <Statistic className="m-4" title="New Users" value={users} />
          <Popover
            content={
              <Row>
                <Col>
                  <Space className="m-2">Pending:</Space>
                  <Tag color="default">
                    ${parseFloat(payouts.pending).toFixed(2)}
                  </Tag>
                </Col>
                <Col>
                  <Space className="m-2">Paid:</Space>
                  <Tag color="success">
                    ${parseFloat(payouts.paid).toFixed(2)}
                  </Tag>
                </Col>
              </Row>
            }
            title="Payout"
          >
            <Statistic
              className="m-4"
              title="Payouts"
              value={parseFloat(payouts.total).toFixed(2)}
              prefix="$"
            />
          </Popover>
          <Statistic
            className="m-4"
            title="Earnings"
            value={parseFloat(earning).toFixed(2)}
            prefix="$"
          />
        </SpaceContainer>
      ) : (
        <SpaceContainer className="d-flex justify-content-around flex-row w-100">
          <Skeleton.Input
            style={{ width: 250 }}
            active={isLoading}
            size="large"
          />
          <Skeleton.Input
            style={{ width: 250 }}
            active={isLoading}
            size="large"
          />
          <Skeleton.Input
            style={{ width: 250 }}
            active={isLoading}
            size="large"
          />
        </SpaceContainer>
      )}
    </Row>
  );
}

export default Statistics;
