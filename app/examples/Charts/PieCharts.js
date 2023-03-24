import React, { PureComponent } from 'react';
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

class PieCharts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      period: props.period,

      // Loader flag
      isLoading: true,

      // Data
      data: [],
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
      },
      () => {
        // API Call
        getAPIMock({ queryPeriod }).then(response => {
          this.setState({
            isLoading: false,
            data: response.data,
          });
        });
      },
    );
  }

  getPieChart(data, colorGenerator) {
    return (
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
            {data.map((entry, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Cell key={`cell-${index}`} fill={colorGenerator[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  render() {
    const { title } = this.props;
    const { data, isLoading } = this.state;
    const colorGenerator = GET_COLORS(data);

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
          <PieChartRow>{this.getPieChart(data, colorGenerator)}</PieChartRow>
        )}
      </PieChartItem>
    );
  }
}

PieCharts.propTypes = {
  period: PropTypes.string,
  title: PropTypes.string,
};
export default PieCharts;
