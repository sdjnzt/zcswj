import React, { useState } from 'react';
import { Table, Tag, Button, Space, Badge, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { BellOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';

interface Message {
  key: string;
  title: string;
  content: string;
  type: '系统通知' | '水质预警' | '设备告警' | '管网维护';
  time: string;
  status: '未读' | '已读';
}

const mockData: Message[] = [
  {
    key: '1',
    title: '水质异常预警',
    content: '城区监测点PH值异常，已超出安全阈值，请及时处理。',
    type: '水质预警',
    time: '2025-05-20 09:00:00',
    status: '未读'
  },
  {
    key: '2',
    title: '设备故障告警',
    content: '南郊水厂加压泵A出现故障，已自动切换备用设备。',
    type: '设备告警',
    time: '2025-05-20 10:30:00',
    status: '未读'
  },
  {
    key: '3',
    title: '管网维护提醒',
    content: '西部主干管计划于5月22日进行维护，届时部分区域将短时停水。',
    type: '管网维护',
    time: '2025-05-20 11:15:00',
    status: '已读'
  },
  {
    key: '4',
    title: '系统升级通知',
    content: '水务大数据平台将于5月25日凌晨升级，期间服务可能受影响。',
    type: '系统通知',
    time: '2025-05-20 14:20:00',
    status: '未读'
  },
  {
    key: '5',
    title: '水质恢复通知',
    content: '北郊水厂水质已恢复正常，相关预警已解除。',
    type: '水质预警',
    time: '2025-05-20 15:45:00',
    status: '已读'
  },
  {
    key: '6',
    title: '设备维护提醒',
    content: '城区监测点流量计B即将到达维护周期，请安排检修。',
    type: '设备告警',
    time: '2025-05-20 16:30:00',
    status: '未读'
  },
  {
    key: '7',
    title: '管网巡检完成',
    content: '东部片区管网巡检已完成，未发现异常。',
    type: '管网维护',
    time: '2025-05-20 17:15:00',
    status: '已读'
  },
  {
    key: '8',
    title: '系统安全提醒',
    content: '请定期修改平台登录密码，确保账号安全。',
    type: '系统通知',
    time: '2025-05-20 18:00:00',
    status: '未读'
  },
  {
    key: '9',
    title: '水质异常预警',
    content: '西部水厂氨氮指标异常，请立即核查。',
    type: '水质预警',
    time: '2025-05-20 19:30:00',
    status: '未读'
  },
  {
    key: '10',
    title: '设备告警解除',
    content: '城区监测点流量计B故障已修复，设备恢复正常运行。',
    type: '设备告警',
    time: '2025-05-20 20:15:00',
    status: '已读'
  }
];

const MessageCenter: React.FC = () => {
  const [data, setData] = useState<Message[]>(mockData);

  const handleRead = (key: string) => {
    setData(data.map(item => 
      item.key === key ? { ...item, status: '已读' } : item
    ));
    message.success('已标记为已读');
  };

  const handleDelete = (key: string) => {
    setData(data.filter(item => item.key !== key));
    message.success('消息已删除');
  };

  const handleReadAll = () => {
    setData(data.map(item => ({ ...item, status: '已读' })));
    message.success('已全部标记为已读');
  };

  const columns: ColumnsType<Message> = [
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Badge status={status === '未读' ? 'processing' : 'default'} text={status} />
      )
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: string) => {
        const color = 
          type === '系统通知' ? 'blue' :
          type === '水质预警' ? 'red' :
          type === '设备告警' ? 'orange' :
          'green';
        return <Tag color={color}>{type}</Tag>;
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      width: 180,
    },
    {
      title: '操作',
      key: 'action',
      align: 'left',
      render: (_, record) => (
        <Space size="small">
          {record.status === '未读' && (
            <Button 
              type="link" 
              icon={<CheckOutlined />} 
              onClick={() => handleRead(record.key)}
            >
              标为已读
            </Button>
          )}
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.key)}
          >
            删除
          </Button>
        </Space>
      )
    }
  ];

  const unreadCount = data.filter(item => item.status === '未读').length;

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>
          <BellOutlined style={{ marginRight: 8 }} />
          消息中心
          {unreadCount > 0 && (
            <Badge 
              count={unreadCount} 
              style={{ marginLeft: 8 }}
            />
          )}
        </h2>
        {unreadCount > 0 && (
          <Button type="primary" onClick={handleReadAll}>
            全部标为已读
          </Button>
        )}
      </div>
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="key"
        bordered
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条消息`
        }}
      />
    </div>
  );
};

export default MessageCenter; 