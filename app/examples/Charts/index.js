/* eslint-disable react/jsx-indent-props */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { PageHeader, Space, Row, Divider } from 'antd';
import PieCharts from './PieCharts';
import Statistics from './Statistics';
import BarCharts from './BarCharts';
import { PeriodDropDown, PERIOD_OPTIONS } from './constants';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      period: 'currentMonth',
    };
  }

  onPeriodChange = period => {
    // Update Period which will trigger individual comp api calls
    this.setState({ period });
  };

  render() {
    const { isStatsLoading, period } = this.state;

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
            <div className="CommonClasses.filters">
              <Space
                className={`${'CommonClasses.filterItem'} align-middle m-1`}
              >
                <PeriodDropDown
                  placeholder="Period"
                  onChange={this.onPeriodChange}
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
}

Dashboard.propTypes = {};

export default Dashboard;
