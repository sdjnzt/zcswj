import React, { useState } from 'react';
import { Card, Row, Col, Table, Tag, Tooltip, Select, Tabs, Button, List, Space, Divider } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, ExclamationCircleOutlined, EyeOutlined, ToolOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Option } = Select;
const { TabPane } = Tabs;

const stats = [
  { title: '管网总长', value: '320 km', color: '#1890ff', trend: '+1.2%', trendType: 'up' },
  { title: '异常报警数', value: 5, color: '#ff4d4f', trend: '-16%', trendType: 'down' },
  { title: '在线设备数', value: 128, color: '#52c41a', trend: '+2', trendType: 'up' },
  { title: '管网分布区域', value: '8 个', color: '#faad14' },
  { title: '设备完好率', value: '98.2%', color: '#13c2c2', trend: '+0.3%', trendType: 'up' },
  { title: '今日巡检次数', value: 12, color: '#722ed1' },
  { title: '本月维修工单', value: 7, color: '#eb2f96', trend: '+1', trendType: 'up' },
  { title: '本月能耗', value: '2.1 万kWh', color: '#2f54eb', trend: '-3%', trendType: 'down' },
];

const areaOptions = ['全部', '城区', '开发区', '工业园', '乡镇'];
const statusOptions = ['全部', '正常', '异常'];

const deviceDetails: { [key: string]: { id: string; name: string; status: string; lastCheck: string }[] } = {
  '1': [
    { id: 'A-01', name: '压力传感器', status: '正常', lastCheck: '2025-05-28' },
    { id: 'A-02', name: '流量计', status: '正常', lastCheck: '2025-05-27' },
  ],
  '2': [
    { id: 'B-01', name: '压力传感器', status: '正常', lastCheck: '2025-05-28' },
    { id: 'B-02', name: '流量计', status: '正常', lastCheck: '2025-05-27' },
  ],
  '3': [
    { id: 'C-01', name: '压力传感器', status: '异常', lastCheck: '2025-05-28' },
    { id: 'C-02', name: '流量计', status: '正常', lastCheck: '2025-05-27' },
  ],
  '4': [
    { id: 'D-01', name: '压力传感器', status: '正常', lastCheck: '2025-05-28' },
  ],
};

const baseDataSource = [
  { key: 1, name: '主干管A', area: '城区', pressure: 0.32, flow: 120, status: '正常', deviceCount: 40, time: '2025-05-15 10:00' },
  { key: 2, name: '支管B', area: '开发区', pressure: 0.28, flow: 80, status: '正常', deviceCount: 25, time: '2025-05-15 10:00' },
  { key: 3, name: '主干管C', area: '工业园', pressure: 0.30, flow: 110, status: '异常', deviceCount: 30, time: '2025-05-15 10:00' },
  { key: 4, name: '支管D', area: '乡镇', pressure: 0.27, flow: 60, status: '正常', deviceCount: 18, time: '2025-05-15 10:00' },
];

const alerts = [
  { id: 1, time: '2025-05-29 09:12', type: '压力异常', pipe: '主干管C', level: '高', status: '未处理' },
  { id: 2, time: '2025-05-29 08:55', type: '设备离线', pipe: '支管D', level: '中', status: '处理中' },
  { id: 3, time: '2025-05-29 08:30', type: '流量异常', pipe: '主干管A', level: '低', status: '已处理' },
];

const lineOption = {
  title: { text: '管网压力/流量趋势', left: 'center', top: 10, textStyle: { fontSize: 16 } },
  tooltip: { trigger: 'axis' },
  legend: { data: ['主干管A-压力', '主干管B-压力', '主干管A-流量'], top: 40 },
  grid: { left: 40, right: 20, bottom: 40, top: 70 },
  xAxis: { type: 'category', data: ['5-25', '5-26', '5-27', '5-28', '5-29'] },
  yAxis: [
    { type: 'value', name: '压力(MPa)', min: 0.2, max: 0.4, position: 'left' },
    { type: 'value', name: '流量(m³/h)', min: 50, max: 130, position: 'right' },
  ],
  series: [
    { name: '主干管A-压力', type: 'line', yAxisIndex: 0, data: [0.31, 0.32, 0.30, 0.29, 0.32], smooth: true, markPoint: { data: [{ type: 'max', name: '最大值' }] } },
    { name: '主干管B-压力', type: 'line', yAxisIndex: 0, data: [0.28, 0.29, 0.27, 0.30, 0.31], smooth: true },
    { name: '主干管A-流量', type: 'line', yAxisIndex: 1, data: [115, 120, 110, 108, 120], smooth: true, markPoint: { data: [{ type: 'min', name: '最小值' }] } },
  ],
};

const areaBarOption = {
  title: { text: '各区域管网流量分布', left: 'center', top: 10, textStyle: { fontSize: 16 } },
  tooltip: { trigger: 'axis' },
  legend: { bottom: 0, data: ['主干管', '支管'] },
  xAxis: { type: 'category', data: ['城区', '开发区', '工业园', '乡镇'] },
  yAxis: { type: 'value', name: '流量(m³/h)' },
  series: [
    { name: '主干管', type: 'bar', stack: '总量', data: [80, 60, 70, 40] },
    { name: '支管', type: 'bar', stack: '总量', data: [40, 20, 30, 20] },
  ],
};

const pieData = [
  { value: 2, name: '压力异常', color: '#1890ff' },
  { value: 1, name: '流量异常', color: '#faad14' },
  { value: 1, name: '设备离线', color: '#52c41a' },
  { value: 1, name: '其他', color: '#ff4d4f' },
];
const pieOption = {
  tooltip: { trigger: 'item' },
  legend: { show: false },
  series: [
    {
      name: '异常类型',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'inside',
        formatter: '{d}%',
        fontSize: 14,
      },
      labelLine: { show: false },
      data: pieData,
      itemStyle: {
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 2,
      },
    },
  ],
};

const devicePieData = [
  { value: 128, name: '在线', color: '#1890ff' },
  { value: 7, name: '离线', color: '#52c41a' },
];
const devicePieOption = {
  tooltip: { trigger: 'item' },
  legend: { show: false },
  series: [
    {
      name: '设备状态',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'inside',
        formatter: '{d}%',
        fontSize: 14,
      },
      labelLine: { show: false },
      data: devicePieData,
      itemStyle: {
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 2,
      },
    },
  ],
};

const deviceGaugeOption = {
  series: [
    {
      type: 'gauge',
      startAngle: 210,
      endAngle: -30,
      radius: '90%',
      progress: { show: true, width: 14 },
      axisLine: { lineStyle: { width: 14 } },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      pointer: { width: 6, length: '70%' },
      detail: { valueAnimation: true, fontSize: 28, formatter: '{value}%', offsetCenter: [0, '30%'] },
      data: [{ value: 94.7 }],
      title: { show: false },
    },
  ],
};

const PipeNetwork: React.FC = () => {
  const [area, setArea] = useState('全部');
  const [status, setStatus] = useState('全部');
  const [tab, setTab] = useState('trend');

  // 筛选表格数据
  const dataSource = baseDataSource.filter(
    (item) => (area === '全部' || item.area === area) && (status === '全部' || item.status === status)
  );

  const columns = [
    { title: '管网名称', dataIndex: 'name', key: 'name' },
    { title: '区域', dataIndex: 'area', key: 'area' },
    { title: '压力(MPa)', dataIndex: 'pressure', key: 'pressure' },
    { title: '流量(m³/h)', dataIndex: 'flow', key: 'flow' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (v: string) => v === '正常' ? <Tag color="green">正常</Tag> : <Tag color="red">异常</Tag> },
    { title: '设备数', dataIndex: 'deviceCount', key: 'deviceCount' },
    { title: '更新时间', dataIndex: 'time', key: 'time' },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="查看详情"><Button size="small" icon={<EyeOutlined />} /></Tooltip>
          <Tooltip title="派单维护"><Button size="small" icon={<ToolOutlined />} /></Tooltip>
        </Space>
      ),
    },
  ];

  const expandedRowRender = (record: any) => (
    <Table
      columns={[
        { title: '设备ID', dataIndex: 'id', key: 'id' },
        { title: '设备名称', dataIndex: 'name', key: 'name' },
        { title: '状态', dataIndex: 'status', key: 'status', render: (v: string) => v === '正常' ? <Tag color="green">正常</Tag> : <Tag color="red">异常</Tag> },
        { title: '上次巡检', dataIndex: 'lastCheck', key: 'lastCheck' },
      ]}
      dataSource={deviceDetails[String(record.key)] || []}
      pagination={false}
      rowKey="id"
      size="small"
    />
  );

  // 统计卡片分两行，每行4个
  const statRows = [stats.slice(0, 4), stats.slice(4, 8)];

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', padding: 32 }}>
      <h2 style={{ marginBottom: 24, fontWeight: 700, fontSize: 24 }}>管网监控</h2>
      {/* 统计卡片 */}
      <div style={{ marginBottom: 32 }}>
        {statRows.map((row, idx) => (
          <Row gutter={24} style={{ marginBottom: 16 }} key={idx}>
            {row.map((item) => (
              <Col span={6} key={item.title}>
                <Card bordered={false} style={{ textAlign: 'center', background: '#fff', height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 2px 8px #f0f1f2' }}>
                  <div style={{ fontSize: 16, color: '#888' }}>{item.title}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.value}
                    {item.trend && (
                      <span style={{ marginLeft: 8, fontSize: 16 }}>
                        {item.trendType === 'up' ? <ArrowUpOutlined style={{ color: '#52c41a' }} /> : <ArrowDownOutlined style={{ color: '#ff4d4f' }} />}
                        <span style={{ color: item.trendType === 'up' ? '#52c41a' : '#ff4d4f', marginLeft: 2 }}>{item.trend}</span>
                      </span>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        ))}
      </div>
      <Row gutter={32}>
        {/* 主体区 */}
        <Col span={16}>
          <Card bordered={false} style={{ marginBottom: 32, background: '#fff', boxShadow: '0 2px 8px #f0f1f2', padding: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, borderLeft: '4px solid #1890ff', paddingLeft: 12 }}>趋势与分布</div>
            <Tabs activeKey={tab} onChange={setTab} style={{ marginBottom: 0 }}>
              <TabPane tab="趋势对比" key="trend">
                <ReactECharts option={lineOption} style={{ height: 320 }} />
              </TabPane>
              <TabPane tab="区域分布" key="area">
                <ReactECharts option={areaBarOption} style={{ height: 320 }} />
              </TabPane>
            </Tabs>
          </Card>
          <Card bordered={false} style={{ background: '#fff', boxShadow: '0 2px 8px #f0f1f2', padding: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, borderLeft: '4px solid #13c2c2', paddingLeft: 12 }}>主要管网运行状态</div>
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Select value={area} onChange={setArea} style={{ width: 100 }}>
                  {areaOptions.map(a => <Option key={a} value={a}>{a}</Option>)}
                </Select>
                <Select value={status} onChange={setStatus} style={{ width: 100 }}>
                  {statusOptions.map(s => <Option key={s} value={s}>{s}</Option>)}
                </Select>
              </Space>
            </div>
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              expandable={{ expandedRowRender }}
              style={{ background: '#fff' }}
            />
          </Card>
        </Col>
        {/* 侧栏区 */}
        <Col span={8}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Card bordered={false} style={{ height: 180, background: '#fafdff', boxShadow: '0 2px 8px #f0f1f2', marginBottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>异常类型分布</div>
              <ReactECharts option={pieOption} style={{ height: 110 }} />
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 4 }}>
                {pieData.map(item => (
                  <Tag key={item.name} color={item.color} style={{ borderRadius: 8, fontSize: 13 }}>{item.name}</Tag>
                ))}
              </div>
            </Card>
            <Card bordered={false} style={{ height: 180, background: '#fafdff', boxShadow: '0 2px 8px #f0f1f2', marginBottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>设备在线分布</div>
              <ReactECharts option={devicePieOption} style={{ height: 110 }} />
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 4 }}>
                {devicePieData.map(item => (
                  <Tag key={item.name} color={item.color} style={{ borderRadius: 8, fontSize: 13 }}>{item.name}</Tag>
                ))}
              </div>
            </Card>
            <Card bordered={false} style={{ height: 180, background: '#fafdff', boxShadow: '0 2px 8px #f0f1f2', marginBottom: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>设备在线率</div>
              <ReactECharts option={deviceGaugeOption} style={{ height: 140 }} />
            </Card>
            <Card bordered={false} style={{ minHeight: 220, background: '#fffbe6', boxShadow: '0 2px 8px #f0f1f2', marginBottom: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8, color: '#faad14' }}><ExclamationCircleOutlined style={{ marginRight: 8 }} />实时告警</div>
              <Divider style={{ margin: '8px 0' }} />
              <List
                dataSource={alerts}
                renderItem={item => (
                  <List.Item actions={[<Button size="small" type="link">{item.status === '未处理' ? '处理' : '查看'}</Button>]}> 
                    <List.Item.Meta
                      title={<span>{item.type} <Tag color={item.level === '高' ? 'red' : item.level === '中' ? 'orange' : 'blue'}>{item.level}</Tag></span>}
                      description={<span>{item.pipe} | {item.time}</span>}
                    />
                    <Tag color={item.status === '未处理' ? 'red' : item.status === '处理中' ? 'orange' : 'green'}>{item.status}</Tag>
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PipeNetwork;
