import React from 'react';
import ReactECharts from 'echarts-for-react';

const TrendChart: React.FC = () => {
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['就业人数', '新增就业']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '就业人数',
        type: 'line',
        data: [82000, 83000, 84000, 84500, 85000, 85200, 85400, 85500, 85600, 85642, 85700, 85800]
      },
      {
        name: '新增就业',
        type: 'line',
        data: [1000, 1200, 1100, 900, 800, 700, 600, 500, 400, 300, 200, 100]
      }
    ]
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: '400px', width: '100%' }}
    />
  );
};

export default TrendChart; 