import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  BarChartOutlined,
  UserOutlined,
  AlertOutlined,
  BellOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const AppSider: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: '数据概览',
    },
    {
      key: '/big-screen',
      icon: <BarChartOutlined />,
      label: '数字大屏',
    },
    {
      key: '/water-quality',
      icon: <BarChartOutlined />,
      label: '水质监测',
    },
    {
      key: '/pipe-network',
      icon: <BarChartOutlined />,
      label: '管网监控',
    },
    {
      key: '/water-fee-stats',
      icon: <BarChartOutlined />,
      label: '水费统计',
    },
    {
      key: '/alert-center',
      icon: <AlertOutlined />,
      label: '预警中心',
    },
    {
      key: '/device-ops',
      icon: <UserOutlined />,
      label: '设备运维',
    },
    {
      key: '/report',
      icon: <BarChartOutlined />,
      label: '数据报表',
    },
    {
      key: '/message-center',
      icon: <BellOutlined />,
      label: '消息中心',
    },
  ];

  return (
    <Sider
      width={220}
      style={{
        background: 'linear-gradient(180deg, #f0f5ff 0%, #fff 100%)',
        boxShadow: '2px 0 8px #f0f1f2',
        minHeight: '100vh',
        paddingTop: 24,
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{
          height: '100%',
          borderRight: 0,
          background: 'transparent',
          fontSize: 16,
          fontWeight: 500,
        }}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
      <style>{`
        .ant-menu-item-selected {
          background: #e6f7ff !important;
          border-radius: 8px !important;
          color: #1890ff !important;
        }
        .ant-menu-item:hover {
          background: #f0f5ff !important;
          border-radius: 8px !important;
        }
      `}</style>
    </Sider>
  );
};

export default AppSider; 