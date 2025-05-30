import React from 'react';
import { Card, Row, Col, Table } from 'antd';
import ReactECharts from 'echarts-for-react';

const stats = [
  { title: '管网总长', value: '320 km' },
  { title: '异常报警数', value: 5 },
  { title: '在线设备数', value: 128 },
];

const columns = [
  { title: '管网名称', dataIndex: 'name', key: 'name' },
  { title: '压力(MPa)', dataIndex: 'pressure', key: 'pressure' },
  { title: '流量(m³/h)', dataIndex: 'flow', key: 'flow' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '更新时间', dataIndex: 'time', key: 'time' },
];

const dataSource = [
  { key: 1, name: '主干管A', pressure: 0.32, flow: 120, status: '正常', time: '2025-05-15 10:00' },
  { key: 2, name: '支管B', pressure: 0.28, flow: 80, status: '正常', time: '2025-05-15 10:00' },
  { key: 3, name: '主干管C', pressure: 0.30, flow: 110, status: '异常', time: '2025-05-15 10:00' },
];

const lineOption = {
  title: { text: '管网压力/流量趋势', left: 'center', top: 10, textStyle: { fontSize: 16 } },
  tooltip: { trigger: 'axis' },
  legend: { data: ['压力', '流量'], top: 40 },
  xAxis: { type: 'category', data: ['5-25', '5-26', '5-27', '5-28', '5-29'] },
  yAxis: { type: 'value' },
  series: [
    { name: '压力', type: 'line', data: [0.31, 0.32, 0.30, 0.29, 0.32] },
    { name: '流量', type: 'line', data: [115, 120, 110, 108, 120] },
  ],
};

const PipeNetwork: React.FC = () => {
  return (
    <div>
      <h2>管网监控</h2>
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
      <Card title="管网压力/流量趋势" style={{ marginBottom: 24 }}>
        <ReactECharts option={lineOption} style={{ height: 300 }} />
      </Card>
      <Card title="主要管网运行状态">
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </Card>
    </div>
  );
};

export default PipeNetwork; 