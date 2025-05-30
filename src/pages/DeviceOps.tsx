import React from 'react';
import { Card, Row, Col, Table } from 'antd';
import ReactECharts from 'echarts-for-react';

const stats = [
  { title: '设备总数', value: 256 },
  { title: '故障设备', value: 4 },
  { title: '待维护设备', value: 7 },
];

const columns = [
  { title: '设备名称', dataIndex: 'name', key: 'name' },
  { title: '类型', dataIndex: 'type', key: 'type' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '最后维护时间', dataIndex: 'lastMaintenance', key: 'lastMaintenance' },
];

const dataSource = [
  { key: 1, name: '加压泵A', type: '泵站', status: '正常', lastMaintenance: '2025-05-20' },
  { key: 2, name: '流量计B', type: '仪表', status: '故障', lastMaintenance: '2025-05-15' },
  { key: 3, name: '阀门C', type: '阀门', status: '待维护', lastMaintenance: '2025-05-30' },
];

const lineOption = {
  title: { text: '设备故障趋势', left: 'center', top: 10, textStyle: { fontSize: 16 } },
  tooltip: { trigger: 'axis' },
  legend: { data: ['故障数'], top: 40 },
  xAxis: { type: 'category', data: ['5-26', '5-27', '5-28', '5-29', '5-30'] },
  yAxis: { type: 'value' },
  series: [
    { name: '故障数', type: 'line', data: [2, 3, 4, 3, 4] },
  ],
};

const DeviceOps: React.FC = () => {
  return (
    <div>
      <h2>设备运维</h2>
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
      <Card title="设备故障趋势" style={{ marginBottom: 24 }}>
        <ReactECharts option={lineOption} style={{ height: 300 }} />
      </Card>
      <Card title="设备运维记录">
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </Card>
    </div>
  );
};

export default DeviceOps; 