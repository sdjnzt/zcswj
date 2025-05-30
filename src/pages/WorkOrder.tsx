import React, { useState } from 'react';
import { Card, Table, Tag, Button, Select, Modal, Form, Input, Space, message, Divider, Row, Col } from 'antd';
import { PlusOutlined, EyeOutlined, DownloadOutlined, CheckCircleOutlined, UserSwitchOutlined, CommentOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';

const { Option } = Select;

const mockOrders = [
  { key: 1, code: 'WO20240530001', device: '加压泵A', type: '设备故障', status: '待派单', area: '城区', createUser: 'admin', createTime: '2025-05-30 09:00', currentUser: '', logs: [] },
  { key: 2, code: 'WO20240530002', device: '流量计B', type: '设备故障', status: '处理中', area: '工业园', createUser: 'ops1', createTime: '2025-05-30 09:10', currentUser: 'ops2', logs: [
    { time: '2025-05-30 09:12', user: 'ops2', action: '接单' },
    { time: '2025-05-30 09:20', user: 'ops2', action: '处理' },
  ] },
  { key: 3, code: 'WO20240530003', device: '阀门C', type: '巡检', status: '已完成', area: '开发区', createUser: 'admin', createTime: '2025-05-29 15:00', currentUser: 'ops1', logs: [
    { time: '2025-05-29 15:10', user: 'ops1', action: '接单' },
    { time: '2025-05-29 15:30', user: 'ops1', action: '处理' },
    { time: '2025-05-29 16:00', user: 'user1', action: '评价', comment: '处理及时' },
  ] },
];

const orderTypes = ['全部', '设备故障', '巡检', '维护', '其他'];
const orderStatus = ['全部', '待派单', '处理中', '已完成'];
const orderAreas = ['全部', '城区', '开发区', '工业园', '乡镇'];

const statusColors: any = { '待派单': 'orange', '处理中': 'blue', '已完成': 'green' };

const WorkOrder: React.FC = () => {
  // 权限mock，实际应从useAuth()获取
  const userRole = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).role : 'user';

  const [orders, setOrders] = useState(mockOrders);
  const [type, setType] = useState('全部');
  const [status, setStatus] = useState('全部');
  const [area, setArea] = useState('全部');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<any>(null);
  const [modal, setModal] = useState<{ type: string, record: any } | null>(null);
  const [form] = Form.useForm();
  const pageSize = 5;

  // 筛选
  const filtered = orders.filter(o =>
    (type === '全部' || o.type === type) &&
    (status === '全部' || o.status === status) &&
    (area === '全部' || o.area === area) &&
    (search === '' || o.device.includes(search) || o.code.includes(search))
  );
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  // 工单统计图表
  const statusPieOption = {
    tooltip: { trigger: 'item' },
    legend: { show: false },
    series: [
      {
        name: '工单状态',
        type: 'pie',
        radius: ['50%', '70%'],
        label: { show: true, position: 'inside', formatter: '{b}: {d}%' },
        data: [
          { value: orders.filter(o => o.status === '待派单').length, name: '待派单', itemStyle: { color: 'orange' } },
          { value: orders.filter(o => o.status === '处理中').length, name: '处理中', itemStyle: { color: 'blue' } },
          { value: orders.filter(o => o.status === '已完成').length, name: '已完成', itemStyle: { color: 'green' } },
        ],
      },
    ],
  };
  const trendOption = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['新建', '完成'], top: 10 },
    grid: { left: 40, right: 20, bottom: 40, top: 50 },
    xAxis: { type: 'category', data: ['5-26', '5-27', '5-28', '5-29', '5-30'] },
    yAxis: { type: 'value', name: '工单数' },
    series: [
      { name: '新建', type: 'bar', data: [2, 3, 4, 3, 4], itemStyle: { color: '#1890ff' } },
      { name: '完成', type: 'line', data: [1, 2, 3, 2, 3], itemStyle: { color: '#52c41a' }, smooth: true },
    ],
  };

  // 工单表格列
  const columns = [
    { title: '工单编号', dataIndex: 'code', key: 'code' },
    { title: '设备', dataIndex: 'device', key: 'device' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    { title: '区域', dataIndex: 'area', key: 'area' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (v: string) => <Tag color={statusColors[v]}>{v}</Tag> },
    { title: '创建人', dataIndex: 'createUser', key: 'createUser' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />} onClick={() => setDetail(record)}>详情</Button>
          {userRole === 'admin' && record.status === '待派单' && <Button size="small" icon={<UserSwitchOutlined />} onClick={() => setModal({ type: 'dispatch', record })}>派单</Button>}
          {userRole === 'ops' && record.status === '处理中' && <Button size="small" icon={<CheckCircleOutlined />} onClick={() => setModal({ type: 'process', record })}>处理</Button>}
          {userRole === 'user' && record.status === '已完成' && <Button size="small" icon={<CommentOutlined />} onClick={() => setModal({ type: 'comment', record })}>评价</Button>}
        </Space>
      ),
    },
  ];

  // 派单/处理/评价等操作
  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (modal?.type === 'dispatch') {
        setOrders(orders.map(o => o.key === modal.record.key ? { ...o, status: '处理中', currentUser: values.user, logs: [...o.logs, { time: dayjs().format('YYYY-MM-DD HH:mm'), user: values.user, action: '派单' }] } : o));
        message.success('派单成功');
      } else if (modal?.type === 'process') {
        setOrders(orders.map(o => o.key === modal.record.key ? { ...o, status: '已完成', logs: [...o.logs, { time: dayjs().format('YYYY-MM-DD HH:mm'), user: 'ops2', action: '处理' }] } : o));
        message.success('处理完成');
      } else if (modal?.type === 'comment') {
        setOrders(orders.map(o => o.key === modal.record.key ? { ...o, logs: [...o.logs, { time: dayjs().format('YYYY-MM-DD HH:mm'), user: 'user1', action: '评价', comment: values.comment }] } : o));
        message.success('评价成功');
      }
      setModal(null);
    });
  };

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', padding: 32 }}>
      <h2 style={{ marginBottom: 24, fontWeight: 700, fontSize: 24 }}>工单中心</h2>
      <Row gutter={32} style={{ marginBottom: 32 }}>
        <Col span={12}>
          <Card bordered={false} style={{ height: 220, background: '#fafdff', boxShadow: '0 2px 8px #f0f1f2', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>工单状态分布</div>
            <ReactECharts option={statusPieOption} style={{ height: 110 }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} style={{ height: 220, background: '#fafdff', boxShadow: '0 2px 8px #f0f1f2', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>工单趋势</div>
            <ReactECharts option={trendOption} style={{ height: 140 }} />
          </Card>
        </Col>
      </Row>
      <Card bordered={false} style={{ background: '#fff', boxShadow: '0 2px 8px #f0f1f2', padding: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, borderLeft: '4px solid #13c2c2', paddingLeft: 12 }}>工单列表</div>
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <Select value={type} onChange={setType} style={{ width: 120 }}>
            {orderTypes.map(t => <Option key={t} value={t}>{t}</Option>)}
          </Select>
          <Select value={status} onChange={setStatus} style={{ width: 120 }}>
            {orderStatus.map(s => <Option key={s} value={s}>{s}</Option>)}
          </Select>
          <Select value={area} onChange={setArea} style={{ width: 120 }}>
            {orderAreas.map(a => <Option key={a} value={a}>{a}</Option>)}
          </Select>
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索设备/工单号" style={{ width: 180 }} allowClear />
          <Button icon={<DownloadOutlined />}>导出</Button>
          <Button type="primary" icon={<PlusOutlined />}>新建工单</Button>
        </div>
        <Table
          columns={columns}
          dataSource={paged}
          pagination={{
            current: page,
            pageSize,
            total: filtered.length,
            onChange: setPage,
            showTotal: total => `共${total}条`,
          }}
          style={{ background: '#fff' }}
        />
      </Card>
      {/* 工单详情弹窗 */}
      <Modal open={!!detail} onCancel={() => setDetail(null)} footer={null} width={600} title="工单详情">
        {detail && (
          <div>
            <div style={{ marginBottom: 12 }}><b>工单编号：</b>{detail.code}</div>
            <div style={{ marginBottom: 12 }}><b>设备：</b>{detail.device}</div>
            <div style={{ marginBottom: 12 }}><b>类型：</b>{detail.type}</div>
            <div style={{ marginBottom: 12 }}><b>区域：</b>{detail.area}</div>
            <div style={{ marginBottom: 12 }}><b>状态：</b><Tag color={statusColors[detail.status]}>{detail.status}</Tag></div>
            <div style={{ marginBottom: 12 }}><b>创建人：</b>{detail.createUser}</div>
            <div style={{ marginBottom: 12 }}><b>创建时间：</b>{detail.createTime}</div>
            <Divider />
            <div style={{ fontWeight: 600, marginBottom: 8 }}>处理流程</div>
            <ol style={{ paddingLeft: 20 }}>
              {detail.logs.length === 0 && <li>待派单</li>}
              {detail.logs.map((log: any, idx: number) => (
                <li key={idx}>{log.time} - {log.user} - {log.action}{log.comment ? `（${log.comment}）` : ''}</li>
              ))}
            </ol>
          </div>
        )}
      </Modal>
      {/* 派单/处理/评价弹窗 */}
      <Modal open={!!modal} onCancel={() => setModal(null)} onOk={handleModalOk} title={modal?.type === 'dispatch' ? '派单' : modal?.type === 'process' ? '处理工单' : '评价工单'} destroyOnClose>
        <Form form={form} layout="vertical">
          {modal?.type === 'dispatch' && <Form.Item name="user" label="派单给运维人员" rules={[{ required: true, message: '请输入运维人员' }]}><Input /></Form.Item>}
          {modal?.type === 'process' && <Form.Item><span>确认处理完成？</span></Form.Item>}
          {modal?.type === 'comment' && <Form.Item name="comment" label="评价" rules={[{ required: true, message: '请输入评价' }]}><Input.TextArea rows={3} /></Form.Item>}
        </Form>
      </Modal>
    </div>
  );
};

export default WorkOrder; 