import React, { useState } from 'react';
import { Table, Button, Modal, Tag, message, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface AuditRecord {
  key: string;
  name: string;
  gender: string;
  age: number;
  education: string;
  submitTime: string;
  submitter: string;
  type: '新增' | '修改' | '删除';
}

const mockData: AuditRecord[] = [
  {
    key: '1',
    name: '张明',
    gender: '男',
    age: 35,
    education: '本科',
    submitTime: '2025-05-20 10:30:00',
    submitter: '李明',
    type: '新增'
  },
  {
    key: '2',
    name: '李华',
    gender: '女',
    age: 28,
    education: '硕士',
    submitTime: '2025-05-20 11:15:00',
    submitter: '王伟',
    type: '修改'
  },
  {
    key: '3',
    name: '王芳',
    gender: '女',
    age: 42,
    education: '博士',
    submitTime: '2025-05-20 14:20:00',
    submitter: '张敏',
    type: '删除'
  },
  {
    key: '4',
    name: '刘强',
    gender: '男',
    age: 31,
    education: '本科',
    submitTime: '2025-05-20 15:45:00',
    submitter: '赵磊',
    type: '新增'
  },
  {
    key: '5',
    name: '陈静',
    gender: '女',
    age: 26,
    education: '硕士',
    submitTime: '2025-05-20 16:30:00',
    submitter: '孙丽',
    type: '修改'
  },
  {
    key: '6',
    name: '赵伟',
    gender: '男',
    age: 39,
    education: '本科',
    submitTime: '2025-05-20 17:15:00',
    submitter: '周强',
    type: '新增'
  },
  {
    key: '7',
    name: '孙丽',
    gender: '女',
    age: 33,
    education: '硕士',
    submitTime: '2025-05-20 18:00:00',
    submitter: '吴婷',
    type: '修改'
  },
  {
    key: '8',
    name: '周明',
    gender: '男',
    age: 45,
    education: '博士',
    submitTime: '2025-05-20 19:30:00',
    submitter: '郑阳',
    type: '删除'
  },
  {
    key: '9',
    name: '吴婷',
    gender: '女',
    age: 29,
    education: '本科',
    submitTime: '2025-05-20 20:15:00',
    submitter: '马超',
    type: '新增'
  },
  {
    key: '10',
    name: '郑阳',
    gender: '男',
    age: 36,
    education: '硕士',
    submitTime: '2025-05-20 21:00:00',
    submitter: '黄娟',
    type: '修改'
  },
  {
    key: '11',
    name: '马超',
    gender: '男',
    age: 32,
    education: '本科',
    submitTime: '2025-05-20 22:30:00',
    submitter: '徐强',
    type: '新增'
  },
  {
    key: '12',
    name: '黄娟',
    gender: '女',
    age: 27,
    education: '硕士',
    submitTime: '2025-05-20 23:15:00',
    submitter: '朱琳',
    type: '修改'
  },
  {
    key: '13',
    name: '徐强',
    gender: '男',
    age: 41,
    education: '博士',
    submitTime: '2025-05-21 09:00:00',
    submitter: '胡明',
    type: '删除'
  },
  {
    key: '14',
    name: '朱琳',
    gender: '女',
    age: 30,
    education: '本科',
    submitTime: '2025-05-21 09:45:00',
    submitter: '李娜',
    type: '新增'
  },
  {
    key: '15',
    name: '胡明',
    gender: '男',
    age: 37,
    education: '硕士',
    submitTime: '2025-05-21 10:30:00',
    submitter: '陈静',
    type: '修改'
  }
];

const AuditCenter: React.FC = () => {
  const [data, setData] = useState<AuditRecord[]>(mockData);

  const handleAudit = (record: AuditRecord, approved: boolean) => {
    Modal.confirm({
      title: `确认${approved ? '通过' : '拒绝'}该${record.type}申请？`,
      content: `申请人：${record.name}`,
      onOk: () => {
        setData(data.filter(item => item.key !== record.key));
        message.success(`${record.type}申请已${approved ? '通过' : '拒绝'}`);
      }
    });
  };

  const columns: ColumnsType<AuditRecord> = [
    {
      title: '操作类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const color = type === '新增' ? 'green' : type === '修改' ? 'blue' : 'red';
        return <Tag color={color}>{type}</Tag>;
      }
    },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '性别', dataIndex: 'gender', key: 'gender' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '学历', dataIndex: 'education', key: 'education' },
    { title: '提交时间', dataIndex: 'submitTime', key: 'submitTime' },
    { title: '提交人', dataIndex: 'submitter', key: 'submitter' },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleAudit(record, true)}>
            通过
          </Button>
          <Button danger onClick={() => handleAudit(record, false)}>
            拒绝
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>审核中心</h2>
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="key"
        bordered
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条记录`
        }}
      />
    </div>
  );
};

export default AuditCenter;