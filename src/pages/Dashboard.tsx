import React from 'react';
import { Card, Row, Col, Statistic, Table, Tabs } from 'antd';
import { FundOutlined, ExperimentOutlined, ToolOutlined, ClusterOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const Dashboard: React.FC = () => {
  // 水务核心统计
  const stats = {
    waterQualityRate: 98.5, // 水质达标率
    monitorCount: 24, // 监测点数量
    deviceCount: 256, // 设备总数
    pipeLength: 320, // 管网总长（km）
    waterUsage: 13800, // 本月用水量（m³）
    waterFee: 41400, // 本月水费（元）
  };

  // 水质趋势数据
  const waterQualityTrend = {
    xAxis: {
      type: 'category',
      data: ['5-20', '5-21', '5-22', '5-23', '5-24', '5-25', '5-26', '5-27', '5-28', '5-29', '5-30'],
    },
    yAxis: { type: 'value' },
    legend: { data: ['PH值', '溶解氧', '浊度'], top: 40 },
    series: [
      { name: 'PH值', type: 'line', data: [7.0, 7.1, 7.2, 7.1, 7.1, 7.2, 7.0, 7.1, 7.2, 7.3, 7.1] },
      { name: '溶解氧', type: 'line', data: [7.9, 8.0, 8.1, 8.0, 8.0, 8.1, 7.9, 8.0, 8.1, 8.2, 8.0] },
      { name: '浊度', type: 'line', data: [0.6, 0.5, 0.6, 0.5, 0.5, 0.6, 0.4, 0.5, 0.5, 0.6, 0.5] },
    ],
  };

  // 异常类型分布
  const abnormalStats = {
    series: [
      {
        type: 'pie',
        radius: '60%',
        data: [
          { value: 4, name: 'PH异常' },
          { value: 2, name: '溶解氧异常' },
          { value: 2, name: '浊度异常' },
          { value: 5, name: '设备故障' },
          { value: 1, name: '通信异常' },
          { value: 2, name: '电源异常' },
        ],
      },
    ],
  };

  // 设备故障趋势
  const deviceFaultTrend = {
    xAxis: { type: 'category', data: ['5-20', '5-21', '5-22', '5-23', '5-24', '5-25', '5-26', '5-27', '5-28', '5-29', '5-30'] },
    yAxis: { type: 'value' },
    series: [
      { name: '故障数', type: 'bar', data: [1, 0, 2, 1, 1, 2, 1, 3, 2, 1, 2] },
    ],
  };

  // 用水量与水费趋势
  const waterUsageTrend = {
    legend: { data: ['用水量', '水费'], top: 40 },
    xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'] },
    yAxis: { type: 'value' },
    series: [
      { name: '用水量', type: 'line', data: [12000, 13500, 12800, 14000, 13200, 13800, 14500, 14200, 13900, 15000, 14800, 14300] },
      { name: '水费', type: 'line', data: [36000, 40500, 38400, 42000, 39600, 41400, 43500, 42600, 41700, 45000, 44400, 42900] },
    ],
  };

  // 设备运维表格
  const deviceOpsData = [
    { key: '1', name: '加压泵A', type: '泵站', status: '正常', lastMaintenance: '2025-05-20' },
    { key: '2', name: '流量计B', type: '仪表', status: '故障', lastMaintenance: '2025-05-15' },
    { key: '3', name: '阀门C', type: '阀门', status: '待维护', lastMaintenance: '2025-05-30' },
    { key: '4', name: '水质传感器D', type: '传感器', status: '正常', lastMaintenance: '2025-05-10' },
    { key: '5', name: '阀门E', type: '阀门', status: '正常', lastMaintenance: '2025-05-28' },
    { key: '6', name: '加压泵F', type: '泵站', status: '故障', lastMaintenance: '2025-05-12' },
    { key: '7', name: '流量计G', type: '仪表', status: '正常', lastMaintenance: '2025-05-18' },
    { key: '8', name: '水质传感器H', type: '传感器', status: '待维护', lastMaintenance: '2025-05-25' },
  ];
  const deviceOpsColumns = [
    { title: '设备名称', dataIndex: 'name', key: 'name' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '最后维护时间', dataIndex: 'lastMaintenance', key: 'lastMaintenance' },
  ];

  // 重点区域用水明细
  const areaUsageData = [
    { key: '1', area: '阳光小区', usage: 1200, fee: 3600 },
    { key: '2', area: '工业园区', usage: 8000, fee: 24000 },
    { key: '3', area: '市政公司', usage: 5000, fee: 15000 },
    { key: '4', area: '滨河花园', usage: 2100, fee: 6300 },
    { key: '5', area: '高新技术区', usage: 6500, fee: 19500 },
    { key: '6', area: '水务局办公楼', usage: 900, fee: 2700 },
    { key: '7', area: '新城区', usage: 3200, fee: 9600 },
    { key: '8', area: '老城区', usage: 4100, fee: 12300 },
  ];
  const areaUsageColumns = [
    { title: '区域', dataIndex: 'area', key: 'area' },
    { title: '用水量(m³)', dataIndex: 'usage', key: 'usage' },
    { title: '水费(元)', dataIndex: 'fee', key: 'fee' },
  ];

  return (
    <div>
      <div style={{
        fontSize: 32,
        fontWeight: 900,
        color: '#3f8efc',
        textAlign: 'center',
        marginBottom: 32,
        letterSpacing: 2,
        textShadow: '0 0 16px #3f8efc55, 0 0 32px #3f8efc22',
      }}>
        邹城市水务局大数据平台
      </div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="水务总览" key="1">
          <Row gutter={[16, 16]}>
            <Col span={6}><Card><Statistic title="水质达标率" value={stats.waterQualityRate} suffix="%" prefix={<ExperimentOutlined />} /></Card></Col>
            <Col span={6}><Card><Statistic title="监测点数量" value={stats.monitorCount} prefix={<FundOutlined />} /></Card></Col>
            <Col span={6}><Card><Statistic title="设备总数" value={stats.deviceCount} prefix={<ToolOutlined />} /></Card></Col>
            <Col span={6}><Card><Statistic title="管网总长" value={stats.pipeLength} suffix="km" prefix={<ClusterOutlined />} /></Card></Col>
            <Col span={12}><Card title="水质指标趋势"><ReactECharts option={waterQualityTrend} style={{ height: '300px' }} /></Card></Col>
            <Col span={12}><Card title="异常类型分布"><ReactECharts option={abnormalStats} style={{ height: '300px' }} /></Card></Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="设备与管网" key="2">
          <Row gutter={[16, 16]}>
            <Col span={12}><Card title="设备故障趋势"><ReactECharts option={deviceFaultTrend} style={{ height: '300px' }} /></Card></Col>
            <Col span={12}><Card title="设备运维记录"><Table columns={deviceOpsColumns} dataSource={deviceOpsData} pagination={false} /></Card></Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="用水与费用" key="3">
          <Row gutter={[16, 16]}>
            <Col span={12}><Card title="用水量与水费趋势"><ReactECharts option={waterUsageTrend} style={{ height: '300px' }} /></Card></Col>
            <Col span={12}><Card title="重点区域用水明细"><Table columns={areaUsageColumns} dataSource={areaUsageData} pagination={false} /></Card></Col>
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Dashboard; 