import React, { useState } from 'react';
import { Card, Table, Tag, Select, DatePicker, Button, Space } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;

const mockLogs = [
  { key: 1, user: 'admin', role: '管理员', type: '登录', detail: '登录系统', time: '2025-05-30 09:00' },
  { key: 2, user: 'ops1', role: '运维', type: '新增设备', detail: '新增加压泵A', time: '2025-05-30 09:10' },
  { key: 3, user: 'finance', role: '财务', type: '导出报表', detail: '导出水费统计', time: '2025-05-30 09:20' },
  { key: 4, user: 'admin', role: '管理员', type: '删除设备', detail: '删除流量计B', time: '2025-05-30 09:30' },
  { key: 5, user: 'user1', role: '普通用户', type: '查看数据', detail: '查看管网监控', time: '2025-05-30 09:40' },
  { key: 6, user: 'ops2', role: '运维', type: '新增设备', detail: '新增水质传感器C', time: '2025-05-30 10:00' },
  { key: 7, user: 'finance', role: '财务', type: '导出报表', detail: '导出设备运维明细', time: '2025-05-30 10:10' },
  { key: 8, user: 'admin', role: '管理员', type: '登录', detail: '登录系统', time: '2025-05-30 10:20' },
  { key: 9, user: 'user2', role: '普通用户', type: '查看数据', detail: '查看水质监测', time: '2025-05-30 10:30' },
  { key: 10, user: 'ops1', role: '运维', type: '删除设备', detail: '删除水泵D', time: '2025-05-30 10:40' },
  { key: 11, user: 'finance', role: '财务', type: '导出报表', detail: '导出年度统计', time: '2025-05-30 10:50' },
  { key: 12, user: 'admin', role: '管理员', type: '删除设备', detail: '删除传感器E', time: '2025-05-30 11:00' },
  { key: 13, user: 'user3', role: '普通用户', type: '查看数据', detail: '查看水费统计', time: '2025-05-30 11:10' },
  { key: 14, user: 'ops2', role: '运维', type: '新增设备', detail: '新增阀门F', time: '2025-05-30 11:20' },
  { key: 15, user: 'admin', role: '管理员', type: '登录', detail: '登录系统', time: '2025-05-30 11:30' },
  { key: 16, user: 'finance', role: '财务', type: '导出报表', detail: '导出月度报表', time: '2025-05-30 11:40' },
  { key: 17, user: 'ops1', role: '运维', type: '新增设备', detail: '新增流量计G', time: '2025-05-30 11:50' },
  { key: 18, user: 'user1', role: '普通用户', type: '查看数据', detail: '查看设备运维', time: '2025-05-30 12:00' },
  { key: 19, user: 'admin', role: '管理员', type: '删除设备', detail: '删除阀门H', time: '2025-05-30 12:10' },
  { key: 20, user: 'ops2', role: '运维', type: '新增设备', detail: '新增水泵I', time: '2025-05-30 12:20' },
];

const logTypes = ['全部', '登录', '新增设备', '删除设备', '导出报表', '查看数据'];
const roles = ['全部', '管理员', '运维', '财务', '普通用户'];

const OperationLog: React.FC = () => {
  const [type, setType] = useState('全部');
  const [role, setRole] = useState('全部');
  const [date, setDate] = useState<any>(null);

  const filtered = mockLogs.filter(log =>
    (type === '全部' || log.type === type) &&
    (role === '全部' || log.role === role) &&
    (!date || (log.time >= date[0]?.format('YYYY-MM-DD') && log.time <= date[1]?.format('YYYY-MM-DD')))
  );

  const columns = [
    { title: '用户', dataIndex: 'user', key: 'user' },
    { title: '角色', dataIndex: 'role', key: 'role', render: (v: string) => <Tag>{v}</Tag> },
    { title: '类型', dataIndex: 'type', key: 'type' },
    { title: '详情', dataIndex: 'detail', key: 'detail' },
    { title: '时间', dataIndex: 'time', key: 'time' },
  ];

  return (
    <div style={{ height: '100%', padding: 0 }}>
      <Card
        bordered={false}
        style={{ width: '100%', boxShadow: '0 2px 8px #f0f1f2', borderRadius: 12, minHeight: 500 }}
        bodyStyle={{ padding: 32 }}
      >
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, borderLeft: '4px solid #1890ff', paddingLeft: 12 }}>操作日志</div>
        <Space style={{ marginBottom: 16 }}>
          <Select value={type} onChange={setType} style={{ width: 120 }}>
            {logTypes.map(t => <Option key={t} value={t}>{t}</Option>)}
          </Select>
          <Select value={role} onChange={setRole} style={{ width: 120 }}>
            {roles.map(r => <Option key={r} value={r}>{r}</Option>)}
          </Select>
          <RangePicker value={date} onChange={setDate} />
          <Button icon={<DownloadOutlined />}>导出</Button>
        </Space>
        <Table columns={columns} dataSource={filtered} pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
};

export default OperationLog; 