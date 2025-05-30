import React, { useState } from 'react';
import { Card, Row, Col, Table, Tag, Tooltip, Button, Select, Tabs, List, Space, Divider } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, ExclamationCircleOutlined, EyeOutlined, BellOutlined, DownloadOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Option } = Select;
const { TabPane } = Tabs;

const stats = [
  { title: '本月收缴水费', value: 1230000, prefix: '¥', color: '#1890ff', trend: '+3.2%', trendType: 'up' },
  { title: '用水总量', value: 52000, suffix: 'm³', color: '#52c41a', trend: '+1.1%', trendType: 'up' },
  { title: '收缴率', value: 98.5, suffix: '%', color: '#13c2c2', trend: '+0.5%', trendType: 'up' },
  { title: '欠费总额', value: 18200, prefix: '¥', color: '#ff4d4f', trend: '-8%', trendType: 'down' },
  { title: '企业用水占比', value: 62, suffix: '%', color: '#faad14' },
  { title: '居民用水占比', value: 33, suffix: '%', color: '#722ed1' },
  { title: '本月催缴次数', value: 21, color: '#eb2f96', trend: '+2', trendType: 'up' },
  { title: '同比增长', value: 4.1, prefix: '+', suffix: '%', color: '#2f54eb', trend: '+4.1%', trendType: 'up' },
];

const areaOptions = ['全部', '城区', '开发区', '工业园', '乡镇'];
const typeOptions = ['全部', '居民', '企业', '机关', '其他'];

const baseDataSource = [
  { key: 1, name: '阳光小区', type: '居民', area: '城区', water: 1200, fee: 3600, arrears: 0, lastPay: '2025-05-10', history: [
    { date: '2025-04', fee: 3500, paid: true },
    { date: '2025-03', fee: 3400, paid: true },
  ] },
  { key: 2, name: '工业园区', type: '企业', area: '工业园', water: 8000, fee: 24000, arrears: 2000, lastPay: '2025-05-08', history: [
    { date: '2025-04', fee: 23000, paid: true },
    { date: '2025-03', fee: 22500, paid: true },
  ] },
  { key: 3, name: '市政公司', type: '机关', area: '城区', water: 5000, fee: 15000, arrears: 0, lastPay: '2025-05-12', history: [
    { date: '2025-04', fee: 14800, paid: true },
    { date: '2025-03', fee: 14700, paid: true },
  ] },
  { key: 4, name: '幸福家园', type: '居民', area: '开发区', water: 900, fee: 2700, arrears: 300, lastPay: '2025-05-09', history: [
    { date: '2025-04', fee: 2600, paid: true },
    { date: '2025-03', fee: 2550, paid: true },
  ] },
  { key: 5, name: '蓝天企业', type: '企业', area: '工业园', water: 6000, fee: 18000, arrears: 0, lastPay: '2025-05-11', history: [
    { date: '2025-04', fee: 17500, paid: true },
    { date: '2025-03', fee: 17000, paid: true },
  ] },
];

const alerts = [
  { id: 1, time: '2025-05-29 09:12', type: '欠费预警', name: '幸福家园', level: '高', status: '未处理', amount: 300 },
  { id: 2, time: '2025-05-29 08:55', type: '用水异常', name: '工业园区', level: '中', status: '处理中', amount: 0 },
  { id: 3, time: '2025-05-29 08:30', type: '超额用水', name: '蓝天企业', level: '低', status: '已处理', amount: 0 },
];

const trendData: { [key: string]: { x: string[]; fee: number[]; water: number[]; arrears: number[] } } = {
  day: {
    x: ['5-25', '5-26', '5-27', '5-28', '5-29'],
    fee: [200000, 220000, 210000, 230000, 240000],
    water: [10000, 11000, 10500, 12000, 11500],
    arrears: [22000, 21000, 20000, 19500, 18200],
  },
  week: {
    x: ['5-1', '5-8', '5-15', '5-22', '5-29'],
    fee: [900000, 950000, 980000, 1100000, 1230000],
    water: [42000, 44000, 46000, 50000, 52000],
    arrears: [25000, 24000, 22000, 20000, 18200],
  },
  month: {
    x: ['1月', '2月', '3月', '4月', '5月'],
    fee: [800000, 900000, 1000000, 1100000, 1230000],
    water: [35000, 40000, 45000, 48000, 52000],
    arrears: [30000, 28000, 25000, 21000, 18200],
  },
};

const typePieData = [
  { value: 33000, name: '企业', color: '#faad14' },
  { value: 17500, name: '居民', color: '#1890ff' },
  { value: 1200, name: '机关', color: '#13c2c2' },
  { value: 300, name: '其他', color: '#ff4d4f' },
];
const typePieOption = {
  tooltip: { trigger: 'item' },
  legend: { show: false },
  series: [
    {
      name: '用水类型',
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
      data: typePieData,
      itemStyle: {
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 2,
      },
    },
  ],
};

const arrearsBarOption = {
  tooltip: { trigger: 'axis' },
  grid: { left: 40, right: 20, bottom: 40, top: 40 },
  xAxis: { type: 'category', data: ['城区', '开发区', '工业园', '乡镇'] },
  yAxis: { type: 'value', name: '欠费(元)' },
  series: [
    { name: '欠费', type: 'bar', data: [6000, 3000, 9000, 200], itemStyle: { color: '#ff4d4f' } },
  ],
};

const WaterFeeStats: React.FC = () => {
  const [area, setArea] = useState('全部');
  const [type, setType] = useState('全部');
  const [tab, setTab] = useState('day');

  // 筛选表格数据
  const dataSource = baseDataSource.filter(
    (item) => (area === '全部' || item.area === area) && (type === '全部' || item.type === type)
  );

  const columns = [
    { title: '小区/企业', dataIndex: 'name', key: 'name' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    { title: '区域', dataIndex: 'area', key: 'area' },
    { title: '本月用水量(m³)', dataIndex: 'water', key: 'water' },
    { title: '本月水费(元)', dataIndex: 'fee', key: 'fee' },
    { title: '欠费(元)', dataIndex: 'arrears', key: 'arrears', render: (v: number) => v > 0 ? <Tag color="red">{v}</Tag> : <Tag color="green">0</Tag> },
    { title: '上次缴费', dataIndex: 'lastPay', key: 'lastPay' },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="详情"><Button size="small" icon={<EyeOutlined />} /></Tooltip>
          <Tooltip title="催缴"><Button size="small" icon={<BellOutlined />} disabled={record.arrears === 0} /></Tooltip>
        </Space>
      ),
    },
  ];

  const expandedRowRender = (record: any) => (
    <Table
      columns={[
        { title: '月份', dataIndex: 'date', key: 'date' },
        { title: '水费(元)', dataIndex: 'fee', key: 'fee' },
        { title: '状态', dataIndex: 'paid', key: 'paid', render: (v: boolean) => v ? <Tag color="green">已缴</Tag> : <Tag color="red">未缴</Tag> },
      ]}
      dataSource={record.history || []}
      pagination={false}
      rowKey="date"
      size="small"
    />
  );

  const trendOption = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['水费收缴', '用水量', '欠费总额'], top: 10 },
    grid: { left: 40, right: 20, bottom: 40, top: 50 },
    xAxis: { type: 'category', data: trendData[tab].x },
    yAxis: [
      { type: 'value', name: '水费收缴(元)', min: 0, position: 'left' },
      { type: 'value', name: '用水量(m³)', min: 0, position: 'right' },
    ],
    series: [
      { name: '水费收缴', type: 'bar', yAxisIndex: 0, data: trendData[tab].fee, itemStyle: { color: '#1890ff' } },
      { name: '用水量', type: 'line', yAxisIndex: 1, data: trendData[tab].water, itemStyle: { color: '#52c41a' }, smooth: true },
      { name: '欠费总额', type: 'line', yAxisIndex: 0, data: trendData[tab].arrears, itemStyle: { color: '#ff4d4f' }, smooth: true },
    ],
  };

  // 统计卡片分两行，每行4个
  const statRows = [stats.slice(0, 4), stats.slice(4, 8)];

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', padding: 32 }}>
      <h2 style={{ marginBottom: 24, fontWeight: 700, fontSize: 24 }}>水费统计</h2>
      {/* 统计卡片 */}
      <div style={{ marginBottom: 32 }}>
        {statRows.map((row, idx) => (
          <Row gutter={24} style={{ marginBottom: 16 }} key={idx}>
            {row.map((item) => (
              <Col span={6} key={item.title}>
                <Card bordered={false} style={{ textAlign: 'center', background: '#fff', height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 2px 8px #f0f1f2' }}>
                  <div style={{ fontSize: 16, color: '#888' }}>{item.title}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: item.color, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                    {item.prefix && <span style={{ fontSize: 18, marginRight: 2 }}>{item.prefix}</span>}
                    <span>{typeof item.value === 'number' ? item.value.toLocaleString() : item.value}</span>
                    {item.suffix && <span style={{ fontSize: 18, marginLeft: 2 }}>{item.suffix}</span>}
                  </div>
                  {item.trend && (
                    <div style={{ fontSize: 16, marginTop: 2, color: item.trendType === 'up' ? '#52c41a' : '#ff4d4f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.trendType === 'up' ? <ArrowUpOutlined style={{ color: '#52c41a' }} /> : <ArrowDownOutlined style={{ color: '#ff4d4f' }} />}
                      <span style={{ marginLeft: 2 }}>{item.trend}</span>
                    </div>
                  )}
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
              <TabPane tab="日趋势" key="day">
                <ReactECharts option={trendOption} style={{ height: 320 }} />
              </TabPane>
              <TabPane tab="周趋势" key="week">
                <ReactECharts option={trendOption} style={{ height: 320 }} />
              </TabPane>
              <TabPane tab="月趋势" key="month">
                <ReactECharts option={trendOption} style={{ height: 320 }} />
              </TabPane>
            </Tabs>
          </Card>
          <Row gutter={24} style={{ marginBottom: 32 }}>
            <Col span={12}>
              <Card bordered={false} style={{ height: 220, background: '#fafdff', boxShadow: '0 2px 8px #f0f1f2', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>用水类型占比</div>
                <ReactECharts option={typePieOption} style={{ height: 110 }} />
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 4 }}>
                  {typePieData.map(item => (
                    <Tag key={item.name} color={item.color} style={{ borderRadius: 8, fontSize: 13 }}>{item.name}</Tag>
                  ))}
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false} style={{ height: 220, background: '#fafdff', boxShadow: '0 2px 8px #f0f1f2', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>欠费分布</div>
                <ReactECharts option={arrearsBarOption} style={{ height: 140 }} />
              </Card>
            </Col>
          </Row>
        </Col>
        {/* 侧栏区 */}
        <Col span={8}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Card bordered={false} style={{ minHeight: 220, background: '#fffbe6', boxShadow: '0 2px 8px #f0f1f2', marginBottom: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8, color: '#faad14' }}><ExclamationCircleOutlined style={{ marginRight: 8 }} />预警提醒</div>
              <Divider style={{ margin: '8px 0' }} />
              <List
                dataSource={alerts}
                renderItem={item => (
                  <List.Item actions={[<Button size="small" type="link">{item.status === '未处理' ? '处理' : '查看'}</Button>]}> 
                    <List.Item.Meta
                      title={<span>{item.type} <Tag color={item.level === '高' ? 'red' : item.level === '中' ? 'orange' : 'blue'}>{item.level}</Tag></span>}
                      description={<span>{item.name} | {item.time}</span>}
                    />
                    {item.amount > 0 && <span style={{ color: '#ff4d4f', fontWeight: 600 }}>¥{item.amount}</span>}
                    <Tag color={item.status === '未处理' ? 'red' : item.status === '处理中' ? 'orange' : 'green'}>{item.status}</Tag>
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </Col>
      </Row>

      {/* 明细表独占一行 */}
      <Card bordered={false} style={{ background: '#fff', boxShadow: '0 2px 8px #f0f1f2', padding: 0, marginTop: 32 }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, borderLeft: '4px solid #13c2c2', paddingLeft: 12 }}>水费明细</div>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Select value={area} onChange={setArea} style={{ width: 100 }}>
              {areaOptions.map(a => <Option key={a} value={a}>{a}</Option>)}
            </Select>
            <Select value={type} onChange={setType} style={{ width: 100 }}>
              {typeOptions.map(t => <Option key={t} value={t}>{t}</Option>)}
            </Select>
            <Button icon={<DownloadOutlined />} size="small">导出</Button>
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
    </div>
  );
};

export default WaterFeeStats; 