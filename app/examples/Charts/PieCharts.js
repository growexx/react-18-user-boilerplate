import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import PropTypes from 'prop-types';
import { Skeleton, Space } from 'antd';
import { GET_COLORS, PieChartItem, PieChartRow } from './constants';
import { getAPIMock } from './stub/index';

function PieCharts({ period, title }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const colorGenerator = GET_COLORS(data);

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
  const getStatistics = (newPeriod = period) => {
    setIsLoading(true);
    // API Call
    getAPIMock({ queryPeriod: newPeriod }).then(response => {
      setData(response.data);
      setIsLoading(false);
    });
  };

  const getPieChart = (pieData, pieColorGenerator) => (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={180}
          fill="#8884d8"
          dataKey="count"
        >
          {pieData.map((entry, index) => (
            <Cell
              key={`cell-${index.toString()}`}
              fill={pieColorGenerator[index]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" />
      </PieChart>
    </ResponsiveContainer>
  );

  return (
    <PieChartItem className=" d-flex justify-content-center flex-column">
      <h4>{title}</h4>
      {isLoading ? (
        <Space className="d-flex justify-content-around flex-row m-2">
          <Skeleton.Button
            style={{ width: 250, height: 250 }}
            active={isLoading}
            size="large"
            shape="circle"
          />
        </Space>
      ) : (
        <PieChartRow>{getPieChart(data, colorGenerator)}</PieChartRow>
      )}
    </PieChartItem>
  );
}

PieCharts.propTypes = {
  period: PropTypes.string,
  title: PropTypes.string,
};
export default PieCharts;
