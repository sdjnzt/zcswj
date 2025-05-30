import React, { useState } from 'react';
import { Card, Form, Input, Button, Select, message } from 'antd';

const { Option } = Select;

const roles = [
  { label: '管理员', value: 'admin' },
  { label: '运维', value: 'ops' },
  { label: '财务', value: 'finance' },
  { label: '普通用户', value: 'user' },
];

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('user', JSON.stringify({ username: values.username, role: values.role }));
      message.success('登录成功');
      window.location.href = '/';
    }, 800);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fa' }}>
      <Card style={{ width: 350, boxShadow: '0 2px 8px #f0f1f2' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>水务大数据平台登录</h2>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}> <Input /> </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}> <Input.Password /> </Form.Item>
          <Form.Item name="role" label="角色" rules={[{ required: true, message: '请选择角色' }]}> <Select>{roles.map(r => <Option key={r.value} value={r.value}>{r.label}</Option>)}</Select> </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>登录</Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login; 