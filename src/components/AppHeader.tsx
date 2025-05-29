import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, BellOutlined, SettingOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const menuItems = [
    {
      key: 'user',
      icon: <UserOutlined />,
      label: '管理员',
    },
    {
      key: 'notification',
      icon: <BellOutlined />,
      label: '消息',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
  ];

  return (
    <Header style={{
      background: '#fff',
      padding: '0 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1890ff',
        letterSpacing: 2
      }}>
        大数据分析平台
      </div>
      <Menu mode="horizontal" style={{ border: 'none' }} items={menuItems} />
    </Header>
  );
};

export default AppHeader; 