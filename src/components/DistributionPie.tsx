import React from 'react';
import ReactECharts from 'echarts-for-react';

const DistributionPie: React.FC = () => {
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '人口分布',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 45000, name: '城镇人口' },
          { value: 35000, name: '农村人口' },
          { value: 15000, name: '流动人口' },
          { value: 17893, name: '其他' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
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

export default DistributionPie; 