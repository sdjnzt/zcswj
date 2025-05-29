import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Tag, message } from 'antd';

interface Person {
  key: string;
  name: string;
  gender: string;
  age: number;
  education: string;
  status: '已审核' | '待审核';
}

const defaultData: Person[] = [
  { key: '1', name: '王磊', gender: '男', age: 38, education: '本科', status: '已审核' },
  { key: '2', name: '李娜', gender: '女', age: 28, education: '硕士', status: '已审核' },
  { key: '3', name: '张伟', gender: '男', age: 42, education: '博士', status: '已审核' },
  { key: '4', name: '刘芳', gender: '女', age: 35, education: '本科', status: '已审核' },
  { key: '5', name: '陈明', gender: '男', age: 31, education: '硕士', status: '已审核' },
  { key: '6', name: '杨丽', gender: '女', age: 29, education: '本科', status: '已审核' },
  { key: '7', name: '赵强', gender: '男', age: 45, education: '博士', status: '已审核' },
  { key: '8', name: '周婷', gender: '女', age: 33, education: '硕士', status: '已审核' },
  { key: '9', name: '吴超', gender: '男', age: 36, education: '本科', status: '已审核' },
  { key: '10', name: '郑娟', gender: '女', age: 27, education: '硕士', status: '已审核' },
  { key: '11', name: '孙明', gender: '男', age: 39, education: '本科', status: '已审核' },
  { key: '12', name: '朱琳', gender: '女', age: 32, education: '硕士', status: '已审核' },
  { key: '13', name: '胡强', gender: '男', age: 41, education: '博士', status: '已审核' },
  { key: '14', name: '马丽', gender: '女', age: 30, education: '本科', status: '已审核' },
  { key: '15', name: '徐明', gender: '男', age: 37, education: '硕士', status: '已审核' },
  { key: '16', name: '黄婷', gender: '女', age: 34, education: '本科', status: '已审核' },
  { key: '17', name: '林超', gender: '男', age: 40, education: '博士', status: '已审核' },
  { key: '18', name: '谢娟', gender: '女', age: 31, education: '硕士', status: '已审核' },
  { key: '19', name: '韩明', gender: '男', age: 43, education: '本科', status: '已审核' },
  { key: '20', name: '唐琳', gender: '女', age: 28, education: '硕士', status: '已审核' }
];

const DataManage: React.FC = () => {
  const [data, setData] = useState<Person[]>(defaultData);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<Person | null>(null);
  const [form] = Form.useForm();

  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '性别', dataIndex: 'gender', key: 'gender' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '学历', dataIndex: 'education', key: 'education' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => status === '已审核' ? <Tag color="green">已审核</Tag> : <Tag color="orange">待审核</Tag>,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Person) => (
        <>
          <Button type="link" onClick={() => onEdit(record)}>编辑</Button>
          <Button type="link" danger onClick={() => onDelete(record.key)}>删除</Button>
        </>
      ),
    },
  ];

  const onAdd = () => {
    setEditing(null);
    form.resetFields();
    setModalVisible(true);
  };

  const onEdit = (record: Person) => {
    setEditing(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const onDelete = (key: string) => {
    Modal.confirm({
      title: '确认删除？',
      onOk: () => {
        setData(data.filter(item => item.key !== key));
        message.success('删除成功');
      },
    });
  };

  const onSave = () => {
    form.validateFields().then(values => {
      if (editing) {
        setData(data.map(item => item.key === editing.key ? { ...values, key: editing.key, status: '待审核' } : item));
        message.success('修改已提交，待审核');
      } else {
        const newItem = { ...values, key: String(Date.now()), status: '待审核' };
        setData([newItem, ...data]);
        message.success('新增已提交，待审核');
      }
      setModalVisible(false);
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>数据维护</h2>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={onAdd}>新增人员</Button>
      <Table columns={columns} dataSource={data} rowKey="key" bordered />
      <Modal
        open={modalVisible}
        title={editing ? '编辑人员' : '新增人员'}
        onOk={onSave}
        onCancel={() => setModalVisible(false)}
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}><Input /></Form.Item>
          <Form.Item label="性别" name="gender" rules={[{ required: true, message: '请选择性别' }]}><Select><Select.Option value="男">男</Select.Option><Select.Option value="女">女</Select.Option></Select></Form.Item>
          <Form.Item label="年龄" name="age" rules={[{ required: true, message: '请输入年龄' }]}><Input type="number" /></Form.Item>
          <Form.Item label="学历" name="education" rules={[{ required: true, message: '请输入学历' }]}><Input /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataManage; 