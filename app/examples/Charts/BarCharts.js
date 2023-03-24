/* eslint-disable react/jsx-indent-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Brush,
} from 'recharts';
import { Skeleton, Space } from 'antd';
import { BarChartWrapper } from './constants';
import { getAPIMock } from './stub';

class BarCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      period: props.period,
      data: [],
      isLoading: true,
    };
  }

  /**
   * Note: On props change should recall the api
   */

  componentDidMount() {
    this.getStatistics();
  }

  /**
   * Get Statistic
   * @param {*} param
   */
  getStatistics({ period: newPeriod } = {}) {
    const { period } = this.state;
    const queryPeriod = newPeriod || period;

    this.setState(
      {
        isLoading: true,
        period: queryPeriod,
      },
      () => {
        // API CALL
        getAPIMock().then(response => {
          this.setState({
            isLoading: false,
            data: response.data,
          });
        });
      },
    );
  }

  render() {
    const { data, isLoading } = this.state;
    const { title } = this.props;

    return (
      <BarChartWrapper className="mt-5 d-flex justify-content-center flex-column w-90">
        <h4>{title}</h4>
        {isLoading ? (
          <Space className="d-flex justify-content-around flex-row w-100">
            <Skeleton.Button
              style={{ width: 500, height: 250 }}
              active={isLoading}
              size="large"
            />
          </Space>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              width={50}
              height={100}
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="m-2" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend
                verticalAlign="bottom"
                wrapperStyle={{ lineHeight: '40px' }}
              />
              <ReferenceLine y={0} stroke="#000" />
              <Brush dataKey="name" height={30} stroke="#8884d8" />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </BarChartWrapper>
    );
  }
}

BarCharts.propTypes = {
  period: PropTypes.string,
  title: PropTypes.string,
};

export default BarCharts;
