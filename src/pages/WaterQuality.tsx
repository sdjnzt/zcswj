import React, { useState } from 'react';
import { Card, Row, Col, Table, Tag, Select, Space } from 'antd';
import ReactECharts from 'echarts-for-react';

// mock 监测点地理分布
const monitorSites = [
  { name: '南郊水厂', value: [116.980, 35.390], ph: 7.2, oxygen: 8.1, turbidity: 0.5, nh3n: 0.2, status: '正常', time: '2024-06-01 10:00' },
  { name: '北郊水厂', value: [116.970, 35.420], ph: 7.0, oxygen: 7.9, turbidity: 0.6, nh3n: 0.3, status: '异常', time: '2024-06-01 10:00' },
  { name: '城区监测点', value: [116.995, 35.405], ph: 7.1, oxygen: 8.0, turbidity: 0.4, nh3n: 0.1, status: '正常', time: '2024-06-01 10:00' },
  { name: '东部水厂', value: [117.010, 35.400], ph: 7.3, oxygen: 8.2, turbidity: 0.5, nh3n: 0.2, status: '正常', time: '2024-06-01 10:00' },
  { name: '西部水厂', value: [116.950, 35.395], ph: 6.9, oxygen: 7.8, turbidity: 0.7, nh3n: 0.4, status: '异常', time: '2024-06-01 10:00' },
];

const indicatorOptions = [
  { label: 'PH值', value: 'ph' },
  { label: '溶解氧', value: 'oxygen' },
  { label: '浊度', value: 'turbidity' },
  { label: '氨氮', value: 'nh3n' },
];

const trendData = {
  ph: [7.1, 7.2, 7.0, 7.1, 7.2, 7.3, 7.1],
  oxygen: [8.0, 8.1, 7.9, 8.0, 8.1, 8.2, 8.0],
  turbidity: [0.5, 0.6, 0.4, 0.5, 0.5, 0.6, 0.5],
  nh3n: [0.2, 0.3, 0.1, 0.2, 0.2, 0.3, 0.2],
};

const abnormalStats = [
  { type: 'PH异常', value: 2 },
  { type: '溶解氧异常', value: 1 },
  { type: '浊度异常', value: 1 },
  { type: '氨氮异常', value: 1 },
];

const columns = [
  { title: '监测点', dataIndex: 'name', key: 'name' },
  { title: '位置', dataIndex: 'location', key: 'location', render: (_: unknown, r: typeof monitorSites[number]) => `${r.value[0].toFixed(3)}, ${r.value[1].toFixed(3)}` },
  { title: 'PH值', dataIndex: 'ph', key: 'ph' },
  { title: '溶解氧', dataIndex: 'oxygen', key: 'oxygen' },
  { title: '浊度', dataIndex: 'turbidity', key: 'turbidity' },
  { title: '氨氮', dataIndex: 'nh3n', key: 'nh3n' },
  { title: '采集时间', dataIndex: 'time', key: 'time' },
  { title: '状态', dataIndex: 'status', key: 'status', render: (v: string) => v === '正常' ? <Tag color="green">正常</Tag> : <Tag color="red">异常</Tag> },
];

const WaterQuality: React.FC = () => {
  const [indicator, setIndicator] = useState('ph');

  // 趋势图 option
  const trendOption = {
    title: { text: `${indicatorOptions.find(i => i.value === indicator)?.label}趋势`, left: 'center', top: 10, textStyle: { fontSize: 16 } },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['5-26', '5-27', '5-28', '5-29', '5-30', '5-31', '6-1'] },
    yAxis: { type: 'value' },
    series: [
      { name: indicatorOptions.find(i => i.value === indicator)?.label, type: 'line', data: trendData[indicator as keyof typeof trendData], smooth: true, lineStyle: { width: 3 } },
    ],
  };

  // 异常分布饼图
  const abnormalOption = {
    title: { text: '异常类型分布', left: 'center', top: 10, textStyle: { fontSize: 16 } },
    tooltip: { trigger: 'item' },
    legend: { bottom: 0 },
    series: [
      {
        name: '异常类型',
        type: 'pie',
        radius: '60%',
        data: abnormalStats.map(i => ({ value: i.value, name: i.type })),
        label: { formatter: '{b}: {c} ({d}%)' },
      },
    ],
  };

  return (
    <div>
      <h2>水质监测</h2>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card title="异常类型分布" bordered={false}>
            <ReactECharts option={abnormalOption} style={{ height: 400 }} />
          </Card>
        </Col>
      </Row>
      <Card title={<Space>水质指标趋势<Select value={indicator} style={{ width: 120 }} onChange={setIndicator} options={indicatorOptions} /></Space>} style={{ marginBottom: 24 }}>
        <ReactECharts option={trendOption} style={{ height: 300 }} />
      </Card>
      <Card title="监测点明细表">
        <Table columns={columns} dataSource={monitorSites} pagination={false} rowKey="name" />
      </Card>
    </div>
  );
};

export default WaterQuality; 