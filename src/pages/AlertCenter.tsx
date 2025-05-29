import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, message } from 'antd';

interface AlertItem {
  id: string;
  time: string;
  type: string;
  content: string;
  read: boolean;
}

const defaultAlerts: AlertItem[] = [
  { id: '1', time: '2025-05-21 09:10:00', type: '水质异常', content: '城区监测点PH值异常，已超出安全阈值！', read: false },
  { id: '2', time: '2025-05-21 09:20:00', type: '设备故障', content: '南郊水厂加压泵A出现故障，已自动切换备用设备。', read: false },
  { id: '3', time: '2025-05-21 10:00:00', type: '管网漏损', content: '西部主干管检测到漏损，请尽快检修。', read: true },
  { id: '4', time: '2025-05-21 10:30:00', type: '用水异常', content: '工业园区用水量突增，超出历史同期30%。', read: false },
  { id: '5', time: '2025-05-21 11:00:00', type: '设备维护提醒', content: '城区监测点流量计B即将到达维护周期，请安排检修。', read: true },
  { id: '6', time: '2025-05-21 11:30:00', type: '系统安全', content: '有用户多次登录失败，存在安全风险！', read: false },
];

const AlertCenter: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>(() => {
    const local = localStorage.getItem('alertCenter');
    if (local) return JSON.parse(local);
    return defaultAlerts;
  });

  // 自动生成水质异常预警（如PH>7.5）
  useEffect(() => {
    const phValue = 7.6; // 可替换为动态数据
    if (phValue > 7.5 && !alerts.some(a => a.type === '水质异常')) {
      const newAlert: AlertItem = {
        id: String(Date.now()),
        time: new Date().toLocaleString(),
        type: '水质异常',
        content: `城区监测点PH值为${phValue}，已超出安全阈值！`,
        read: false,
      };
      const newAlerts = [newAlert, ...alerts];
      setAlerts(newAlerts);
      localStorage.setItem('alertCenter', JSON.stringify(newAlerts));
      message.warning(newAlert.content);
    }
    // eslint-disable-next-line
  }, []);

  const markRead = (id: string) => {
    const newAlerts = alerts.map(a => a.id === id ? { ...a, read: true } : a);
    setAlerts(newAlerts);
    localStorage.setItem('alertCenter', JSON.stringify(newAlerts));
  };

  const columns = [
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    { title: '内容', dataIndex: 'content', key: 'content' },
    {
      title: '状态',
      dataIndex: 'read',
      key: 'read',
      render: (read: boolean) => read ? <Tag color="green">已读</Tag> : <Tag color="red">未读</Tag>,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: AlertItem) => !record.read ? (
        <Button type="link" onClick={() => markRead(record.id)}>标记已读</Button>
      ) : null,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>预警中心</h2>
      <Table columns={columns} dataSource={alerts} rowKey="id" bordered />
    </div>
  );
};

export default AlertCenter; 