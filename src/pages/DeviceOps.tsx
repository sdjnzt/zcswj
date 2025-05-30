import React, { useState } from 'react';
import { Card, Row, Col, Table, Tag, Button, Tooltip, Modal, Form, Input, Select, Space, Popconfirm, message, Tabs, Divider } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, ArrowUpOutlined, ArrowDownOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Option } = Select;
const { TabPane } = Tabs;

const initialStats: {
  title: string;
  value: number;
  color: string;
  trend?: string;
  trendType?: 'up' | 'down';
  prefix?: string;
  suffix?: string;
}[] = [
  { title: '设备总数', value: 256, color: '#1890ff', trend: '+2', trendType: 'up' },
  { title: '在线率', value: 97.2, suffix: '%', color: '#52c41a', trend: '+0.5%', trendType: 'up' },
  { title: '故障设备', value: 4, color: '#ff4d4f', trend: '+1', trendType: 'up' },
  { title: '待维护设备', value: 7, color: '#faad14', trend: '-2', trendType: 'down' },
  { title: '今日巡检', value: 12, color: '#13c2c2' },
  { title: '维护率', value: 95.6, suffix: '%', color: '#2f54eb', trend: '+1.2%', trendType: 'up' },
  { title: '异常率', value: 1.8, suffix: '%', color: '#eb2f96', trend: '-0.2%', trendType: 'down' },
  { title: '本月维修工单', value: 18, color: '#722ed1', trend: '+3', trendType: 'up' },
];

const initialDevices = [
  { key: 1, name: '加压泵A', type: '泵站', status: '正常', lastMaintenance: '2025-05-20', area: '城区', online: true },
  { key: 2, name: '流量计B', type: '仪表', status: '故障', lastMaintenance: '2025-05-15', area: '工业园', online: false },
  { key: 3, name: '阀门C', type: '阀门', status: '待维护', lastMaintenance: '2025-05-30', area: '开发区', online: true },
  { key: 4, name: '水质传感器D', type: '传感器', status: '正常', lastMaintenance: '2025-05-18', area: '乡镇', online: true },
  { key: 5, name: '加压泵E', type: '泵站', status: '正常', lastMaintenance: '2025-05-10', area: '城区', online: true },
  { key: 6, name: '流量计F', type: '仪表', status: '故障', lastMaintenance: '2025-05-12', area: '工业园', online: false },
  { key: 7, name: '阀门G', type: '阀门', status: '正常', lastMaintenance: '2025-05-25', area: '开发区', online: true },
  { key: 8, name: '水质传感器H', type: '传感器', status: '待维护', lastMaintenance: '2025-05-28', area: '乡镇', online: true },
];

const deviceTypes = ['泵站', '仪表', '阀门', '传感器'];
const deviceStatus = ['正常', '故障', '待维护'];
const deviceAreas = ['全部', '城区', '开发区', '工业园', '乡镇'];

const trendData: { [key: string]: { x: string[]; fault: number[]; maintain: number[]; online: number[] } } = {
  day: {
    x: ['5-26', '5-27', '5-28', '5-29', '5-30'],
    fault: [2, 3, 4, 3, 4],
    maintain: [1, 2, 2, 3, 2],
    online: [250, 251, 252, 253, 254],
  },
  week: {
    x: ['5-1', '5-8', '5-15', '5-22', '5-29'],
    fault: [2, 3, 4, 3, 4],
    maintain: [1, 2, 2, 3, 2],
    online: [245, 247, 250, 252, 254],
  },
  month: {
    x: ['1月', '2月', '3月', '4月', '5月'],
    fault: [3, 2, 4, 3, 4],
    maintain: [2, 2, 3, 2, 2],
    online: [240, 245, 250, 252, 254],
  },
};

const typePieData = [
  { value: 80, name: '泵站', color: '#1890ff' },
  { value: 60, name: '仪表', color: '#faad14' },
  { value: 70, name: '阀门', color: '#52c41a' },
  { value: 46, name: '传感器', color: '#eb2f96' },
];
const typePieOption = {
  tooltip: { trigger: 'item' },
  legend: { show: false },
  series: [
    {
      name: '设备类型',
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

const statusPieData = [
  { value: 240, name: '正常', color: '#52c41a' },
  { value: 8, name: '故障', color: '#ff4d4f' },
  { value: 8, name: '待维护', color: '#faad14' },
];
const statusPieOption = {
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
      data: statusPieData,
      itemStyle: {
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 2,
      },
    },
  ],
};

const DeviceOps: React.FC = () => {
  const [stats] = useState(initialStats);
  const [devices, setDevices] = useState(initialDevices);
  const [area, setArea] = useState('全部');
  const [type, setType] = useState('全部');
  const [statusFilter, setStatusFilter] = useState('全部');
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('day');
  const [modalVisible, setModalVisible] = useState(false);
  const [editDevice, setEditDevice] = useState<any>(null);
  const [form] = Form.useForm();

  // 筛选和搜索
  const filteredDevices = devices.filter(d =>
    (area === '全部' || d.area === area) &&
    (type === '全部' || d.type === type) &&
    (statusFilter === '全部' || d.status === statusFilter) &&
    (search === '' || d.name.includes(search))
  );

  // 分页
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const pagedDevices = filteredDevices.slice((page - 1) * pageSize, page * pageSize);

  // 表格列
  const columns = [
    { title: '设备名称', dataIndex: 'name', key: 'name' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    { title: '区域', dataIndex: 'area', key: 'area' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (v: string) => v === '正常' ? <Tag color="green">正常</Tag> : v === '故障' ? <Tag color="red">故障</Tag> : <Tag color="orange">待维护</Tag> },
    { title: '在线', dataIndex: 'online', key: 'online', render: (v: boolean) => v ? <Tag color="#52c41a">在线</Tag> : <Tag color="#bfbfbf">离线</Tag> },
    { title: '最后维护时间', dataIndex: 'lastMaintenance', key: 'lastMaintenance' },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="详情"><Button size="small" icon={<EyeOutlined />} /></Tooltip>
          <Tooltip title="编辑"><Button size="small" icon={<EditOutlined />} onClick={() => onEdit(record)} /></Tooltip>
          <Popconfirm title="确定删除该设备吗？" onConfirm={() => onDelete(record.key)} okText="删除" cancelText="取消">
            <Tooltip title="删除"><Button size="small" icon={<DeleteOutlined />} danger /></Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  function onAdd() {
    setEditDevice(null);
    form.resetFields();
    setModalVisible(true);
  }
  function onEdit(record: any) {
    setEditDevice(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  }
  function onDelete(key: number) {
    setDevices(devices.filter(d => d.key !== key));
    message.success('删除成功');
  }
  function handleOk() {
    form.validateFields().then(values => {
      if (editDevice) {
        setDevices(devices.map(d => d.key === editDevice.key ? { ...editDevice, ...values } : d));
        message.success('编辑成功');
      } else {
        const newKey = Math.max(...devices.map(d => d.key)) + 1;
        setDevices([...devices, { ...values, key: newKey }]);
        message.success('新增成功');
      }
      setModalVisible(false);
    });
  }

  // 统计卡片分两行
  const statRows = [stats.slice(0, 4), stats.slice(4, 8)];

  const trendOption = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['故障数', '维护数', '在线设备'], top: 10 },
    grid: { left: 40, right: 20, bottom: 40, top: 50 },
    xAxis: { type: 'category', data: trendData[tab].x },
    yAxis: [
      { type: 'value', name: '数量', min: 0, position: 'left' },
    ],
    series: [
      { name: '故障数', type: 'line', data: trendData[tab].fault, itemStyle: { color: '#ff4d4f' }, smooth: true },
      { name: '维护数', type: 'line', data: trendData[tab].maintain, itemStyle: { color: '#faad14' }, smooth: true },
      { name: '在线设备', type: 'bar', data: trendData[tab].online, itemStyle: { color: '#1890ff' } },
    ],
  };

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', padding: 32 }}>
      <h2 style={{ marginBottom: 24, fontWeight: 700, fontSize: 24 }}>设备运维</h2>
      {/* 统计卡片 */}
      <div style={{ marginBottom: 32 }}>
        {statRows.map((row, idx) => (
          <Row gutter={24} style={{ marginBottom: 16 }} key={idx}>
            {row.map((item) => (
              <Col span={6} key={item.title}>
                <Card bordered={false} style={{ textAlign: 'center', background: '#fff', height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 2px 8px #f0f1f2' }}>
                  <div style={{ fontSize: 16, color: '#888' }}>{item.title}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: item.color, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                    {item.prefix ? <span style={{ fontSize: 18, marginRight: 2 }}>{item.prefix}</span> : null}
                    <span>{typeof item.value === 'number' ? item.value.toLocaleString() : item.value}</span>
                    {item.suffix ? <span style={{ fontSize: 18, marginLeft: 2 }}>{item.suffix}</span> : null}
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
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>设备类型分布</div>
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
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>设备状态分布</div>
                <ReactECharts option={statusPieOption} style={{ height: 110 }} />
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 4 }}>
                  {statusPieData.map(item => (
                    <Tag key={item.name} color={item.color} style={{ borderRadius: 8, fontSize: 13 }}>{item.name}</Tag>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Card bordered={false} style={{ minHeight: 220, background: '#fffbe6', boxShadow: '0 2px 8px #f0f1f2', marginBottom: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8, color: '#faad14' }}><ReloadOutlined style={{ marginRight: 8 }} />运维提醒</div>
            <Divider style={{ margin: '8px 0' }} />
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li>2台设备今日需维护</li>
              <li>4台设备当前故障</li>
              <li>1台设备已超期未维护</li>
            </ul>
          </Card>
        </Col>
      </Row>
      {/* 增删改查操作区 */}
      <Card bordered={false} style={{ background: '#fff', boxShadow: '0 2px 8px #f0f1f2', padding: 0, marginTop: 32 }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, borderLeft: '4px solid #13c2c2', paddingLeft: 12 }}>设备运维明细</div>
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <Select value={area} onChange={setArea} style={{ width: 100 }}>
            {deviceAreas.map(a => <Option key={a} value={a}>{a}</Option>)}
          </Select>
          <Select value={type} onChange={setType} style={{ width: 100 }}>
            <Option value="全部">全部类型</Option>
            {deviceTypes.map(t => <Option key={t} value={t}>{t}</Option>)}
          </Select>
          <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 100 }}>
            <Option value="全部">全部状态</Option>
            {deviceStatus.map(s => <Option key={s} value={s}>{s}</Option>)}
          </Select>
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索设备名称" prefix={<SearchOutlined />} style={{ width: 180 }} allowClear />
          <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>新增设备</Button>
        </div>
        <Table
          columns={columns}
          dataSource={pagedDevices}
          pagination={{
            current: page,
            pageSize,
            total: filteredDevices.length,
            onChange: setPage,
            showTotal: total => `共${total}条`,
          }}
          style={{ background: '#fff' }}
        />
      </Card>
      {/* 新增/编辑弹窗 */}
      <Modal
        title={editDevice ? '编辑设备' : '新增设备'}
        open={modalVisible}
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical" initialValues={{ online: true }}>
          <Form.Item name="name" label="设备名称" rules={[{ required: true, message: '请输入设备名称' }]}> <Input /> </Form.Item>
          <Form.Item name="type" label="类型" rules={[{ required: true, message: '请选择类型' }]}> <Select>{deviceTypes.map(t => <Option key={t} value={t}>{t}</Option>)}</Select> </Form.Item>
          <Form.Item name="area" label="区域" rules={[{ required: true, message: '请选择区域' }]}> <Select>{deviceAreas.filter(a=>a!=='全部').map(a => <Option key={a} value={a}>{a}</Option>)}</Select> </Form.Item>
          <Form.Item name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}> <Select>{deviceStatus.map(s => <Option key={s} value={s}>{s}</Option>)}</Select> </Form.Item>
          <Form.Item name="online" label="在线"><Select><Option value={true}>在线</Option><Option value={false}>离线</Option></Select></Form.Item>
          <Form.Item name="lastMaintenance" label="最后维护时间" rules={[{ required: true, message: '请输入维护时间' }]}> <Input /> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeviceOps; 