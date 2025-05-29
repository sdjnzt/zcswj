import React, { useState } from 'react';
import { Table } from 'antd';

interface LogItem {
  time: string;
  type: string;
  detail: string;
}

const defaultLogs: LogItem[] = [
  { time: '2025-05-21 09:00:00', type: '登录', detail: '用户 admin 登录系统' },
  { time: '2025-05-21 09:05:12', type: '数据编辑', detail: '编辑人员信息：王磊' },
  { time: '2025-05-21 09:10:23', type: '数据删除', detail: '删除企业信息：济宁智慧城市发展有限公司' },
  { time: '2025-05-21 09:15:45', type: '数据新增', detail: '新增岗位：大数据分析师' },
  { time: '2025-05-21 09:20:00', type: '登出', detail: '用户 admin 退出系统' },
  { time: '2025-05-21 10:00:00', type: '登录', detail: '用户 user1 登录系统' },
  { time: '2025-05-21 10:05:12', type: '数据编辑', detail: '编辑人员信息：李娜' },
  { time: '2025-05-21 10:10:23', type: '数据删除', detail: '删除岗位：UI设计师' },
  { time: '2025-05-21 10:15:45', type: '数据新增', detail: '新增企业：兖州区数字科技有限公司' },
  { time: '2025-05-21 10:20:00', type: '登出', detail: '用户 user1 退出系统' },
  { time: '2025-05-21 11:00:00', type: '登录', detail: '用户 user2 登录系统' },
  { time: '2025-05-21 11:05:12', type: '数据编辑', detail: '编辑企业信息：山东鲁南装备制造有限公司' },
  { time: '2025-05-21 11:10:23', type: '数据删除', detail: '删除人员信息：孙涛' },
  { time: '2025-05-21 11:15:45', type: '数据新增', detail: '新增岗位：产品经理' },
  { time: '2025-05-21 11:20:00', type: '登出', detail: '用户 user2 退出系统' },
  { time: '2025-05-21 12:00:00', type: '登录', detail: '用户 admin 登录系统' },
  { time: '2025-05-21 12:05:12', type: '数据编辑', detail: '编辑岗位信息：大数据分析师' },
  { time: '2025-05-21 12:10:23', type: '数据删除', detail: '删除企业信息：兖州区数字科技有限公司' },
  { time: '2025-05-21 12:15:45', type: '数据新增', detail: '新增人员：赵静' },
  { time: '2025-05-21 12:20:00', type: '登出', detail: '用户 admin 退出系统' },
];

const LogCenter: React.FC = () => {
  const [logs] = useState<LogItem[]>(() => {
    const local = localStorage.getItem('logCenter');
    if (local) return JSON.parse(local);
    return defaultLogs;
  });

  const columns = [
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    { title: '详情', dataIndex: 'detail', key: 'detail' },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>操作日志</h2>
      <Table columns={columns} dataSource={logs} rowKey={(r) => r.time + r.type + r.detail} bordered />
    </div>
  );
};

export default LogCenter; 