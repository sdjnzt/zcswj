import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Dashboard from './pages/Dashboard';
import SmartSearch from './pages/SmartSearch';
import SmartReport from './pages/SmartReport';
import SmartProfile from './pages/SmartProfile';
import LogCenter from './pages/LogCenter';
import AlertCenter from './pages/AlertCenter';
import DataManage from './pages/DataManage';
import AuditCenter from './pages/AuditCenter';
import MessageCenter from './pages/MessageCenter';
import AppHeader from './components/AppHeader';
import AppSider from './components/AppSider';
import BigScreen from './pages/BigScreen';
import WaterQuality from './pages/WaterQuality';
import PipeNetwork from './pages/PipeNetwork';
import WaterFeeStats from './pages/WaterFeeStats';
import DeviceOps from './pages/DeviceOps';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Routes>
        <Route path="/big-screen" element={<BigScreen />} />
        <Route path="*" element={
          <Layout>
            <AppHeader />
            <Layout>
              <AppSider />
              <Layout style={{ padding: '24px' }}>
                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/data-manage" element={<DataManage />} />
                    <Route path="/audit-center" element={<AuditCenter />} />
                    <Route path="/search" element={<SmartSearch />} />
                    <Route path="/report" element={<SmartReport />} />
                    <Route path="/profile" element={<SmartProfile />} />
                    <Route path="/log-center" element={<LogCenter />} />
                    <Route path="/alert-center" element={<AlertCenter />} />
                    <Route path="/message-center" element={<MessageCenter />} />
                    <Route path="/big-screen" element={<BigScreen />} />
                    <Route path="/water-quality" element={<WaterQuality />} />
                    <Route path="/pipe-network" element={<PipeNetwork />} />
                    <Route path="/water-fee-stats" element={<WaterFeeStats />} />
                    <Route path="/device-ops" element={<DeviceOps />} />
                  </Routes>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        } />
      </Routes>
    </Layout>
  );
};

export default App; 