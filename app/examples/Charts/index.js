/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Space, Row, Divider } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import PieCharts from './PieCharts';
import Statistics from './Statistics';
import BarCharts from './BarCharts';
import { PeriodDropDown, PERIOD_OPTIONS } from './constants';

function Dashboard() {
  const [period, setPeriod] = useState('currentMonth');
  const [isStatsLoading] = useState(false);

  const onPeriodChange = selectedPeriod => {
    // Update Period which will trigger individual comp api calls
    setPeriod(selectedPeriod);
  };

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
      </Helmet>
      <PageHeader
        title="Dashboard"
        className="CommonClasses.PageHeader"
        extra={[
          <div className="CommonClasses.filters" key="filters">
            <Space className={`${'CommonClasses.filterItem'} align-middle m-1`}>
              <PeriodDropDown
                placeholder="Period"
                onChange={onPeriodChange}
                options={PERIOD_OPTIONS}
                disabled={isStatsLoading}
                value={period}
              />
            </Space>
          </div>,
        ]}
      />
      <div>
        <Statistics period={period} />
        <Divider width="auto" />
        <Row
          className="m-1 d-flex justify-content-center flex-row align-items-start"
          wrap
        >
          <PieCharts
            className="Classes.PieChatItem"
            key={`category-${period}`}
            title="Sales by Category"
            period={period}
            type="category"
          />
          <PieCharts
            className="Classes.PieChatItem"
            key={`university-${period}`}
            title="Sales by University"
            period={period}
            type="university"
          />
          <BarCharts title="Sign up" period={period} />
        </Row>
      </div>
    </div>
  );
}

export default Dashboard;
