import { Row, Select, Space } from 'antd';
import styled from 'styled-components';
/**
 *  Current Month, Last Month, Current Quarter (QTD), Last Quarter, Current Year (YTD), Last Year
 */
export const PERIOD_OPTIONS = [
  {
    label: 'Current Month (MTD)',
    value: 'currentMonth',
  },
  {
    label: 'Last Month',
    value: 'lastMonth',
  },
  {
    label: 'Current Quarter (QTD)',
    value: 'currentQuarter',
  },
  {
    label: 'Last Quarter',
    value: 'lastQuarter',
  },
  {
    label: 'Current Year (YTD)',
    value: 'currentYear',
  },
  {
    label: 'Last Year',
    value: 'lastYear',
  },
];

export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
export const GET_COLORS = data => {
  const colors = [];
  data.forEach((d, index) => {
    let localIndex = index;
    let foundColor = false;
    while (!foundColor) {
      const pickedColor = COLORS[localIndex % COLORS.length];
      if (localIndex > 100) {
        colors.push(pickedColor);
        foundColor = true;
      } else {
        const checkFirstColor =
          index === data.length - 1 ? colors[0] !== pickedColor : true;
        const checkPreviousColor =
          index > 0 ? colors[index - 1] !== pickedColor : true;
        if (checkFirstColor && checkPreviousColor) {
          colors.push(pickedColor);
          foundColor = true;
        } else {
          // eslint-disable-next-line no-plusplus
          localIndex++;
        }
      }
    }
  });

  return colors;
};

export const PeriodDropDown = styled(Select)`
  width: 100%;
  min-width: 325px;
  @media screen and (max-width: 500px) {
    max-width: 325px;
    min-width: initial;
  }
`;

export const FilterItem = styled(Space)``;
export const BarChartWrapper = styled(Row)`
  width: 97%;
  margin: 0 auto;
  text-align: center;
`;
export const PieChartRow = styled(Row)`
  display: flex;
`;
export const PieChartItem = styled.div`
  width: 50%;
  text-align: center;

  @media all and (max-width: 1024px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;
