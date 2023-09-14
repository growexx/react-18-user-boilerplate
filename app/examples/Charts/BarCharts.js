/* eslint-disable react/jsx-indent-props */
import React, { useState, useEffect } from 'react';
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

function BarCharts({ period, title }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Note: On props change should recall the api
   */
  useEffect(() => {
    getStatistics();
  }, [period]);

  /**
   * Get Statistic
   * @param {*} param
   */
  const getStatistics = () => {
    setIsLoading(true);
    // API CALL
    getAPIMock().then(response => {
      setData(response.data);
      setIsLoading(false);
    });
  };

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

BarCharts.propTypes = {
  period: PropTypes.string,
  title: PropTypes.string,
};

export default BarCharts;
