import React from 'react';
import { Card, Row, Col, Table } from 'antd';
import ReactECharts from 'echarts-for-react';

const stats = [
  { title: '本月收缴水费', value: '¥ 1,230,000' },
  { title: '用水总量', value: '52,000 m³' },
  { title: '欠费户数', value: 18 },
];

const columns = [
  { title: '小区/企业', dataIndex: 'name', key: 'name' },
  { title: '本月用水量(m³)', dataIndex: 'water', key: 'water' },
  { title: '本月水费(元)', dataIndex: 'fee', key: 'fee' },
  { title: '欠费(元)', dataIndex: 'arrears', key: 'arrears' },
];

const dataSource = [
  { key: 1, name: '阳光小区', water: 1200, fee: 3600, arrears: 0 },
  { key: 2, name: '工业园区', water: 8000, fee: 24000, arrears: 2000 },
  { key: 3, name: '市政公司', water: 5000, fee: 15000, arrears: 0 },
];

const lineOption = {
  title: { text: '水费收缴与用水量趋势', left: 'center', top: 10, textStyle: { fontSize: 16 } },
  tooltip: { trigger: 'axis' },
  legend: { data: ['水费收缴', '用水量'], top: 40 },
  xAxis: { type: 'category', data: ['5-28', '5-29', '5-30', '5-31', '6-1'] },
  yAxis: { type: 'value' },
  series: [
    { name: '水费收缴', type: 'line', data: [200000, 220000, 210000, 230000, 240000] },
    { name: '用水量', type: 'line', data: [10000, 11000, 10500, 12000, 11500] },
  ],
};

const WaterFeeStats: React.FC = () => {
  return (
    <div>
      <h2>水费统计</h2>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {stats.map((item) => (
          <Col span={8} key={item.title}>
            <Card bordered={false} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, color: '#888' }}>{item.title}</div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>{item.value}</div>
            </Card>
          </Col>
        ))}
      </Row>
      <Card title="水费收缴与用水量趋势" style={{ marginBottom: 24 }}>
        <ReactECharts option={lineOption} style={{ height: 300 }} />
      </Card>
      <Card title="主要小区/企业水费明细">
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </Card>
    </div>
  );
};

export default WaterFeeStats; 