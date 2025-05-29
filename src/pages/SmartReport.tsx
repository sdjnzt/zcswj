import React, { useState, useRef } from 'react';
import { Card, Row, Col, Button, Select, DatePicker, Typography, Divider, message, Spin, Alert, Space } from 'antd';
import { DownloadOutlined, FileTextOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

interface ReportData {
  waterQualityTrend: {
    days: string[];
    ph: number[];
    oxygen: number[];
    turbidity: number[];
  };
  abnormalStats: {
    type: string;
    value: number;
  }[];
  deviceFaultTrend: {
    days: string[];
    faults: number[];
  };
  waterUsage: {
    months: string[];
    usage: number[];
    fee: number[];
  };
  reportContent: {
    title: string;
    content: string;
  }[];
}

const SmartReport: React.FC = () => {
  const [reportType, setReportType] = useState('monthly');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([dayjs().subtract(1, 'month'), dayjs()]);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [downloading, setDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  // 报告类型选项
  const reportTypes = [
    { label: '月度水务运行报告', value: 'monthly' },
    { label: '季度水质分析报告', value: 'quarterly' },
    { label: '年度设备运维报告', value: 'yearly' },
    { label: '管网运行报告', value: 'pipe' },
    { label: '用水量与水费报告', value: 'usage' },
  ];

  // 模拟获取报告数据
  const fetchReportData = async () => {
    return new Promise<ReportData>((resolve) => {
      setTimeout(() => {
        resolve({
          waterQualityTrend: {
            days: ['5-26', '5-27', '5-28', '5-29', '5-30', '5-31', '6-1'],
            ph: [7.1, 7.2, 7.0, 7.1, 7.2, 7.3, 7.1],
            oxygen: [8.0, 8.1, 7.9, 8.0, 8.1, 8.2, 8.0],
            turbidity: [0.5, 0.6, 0.4, 0.5, 0.5, 0.6, 0.5],
          },
          abnormalStats: [
            { type: 'PH异常', value: 2 },
            { type: '溶解氧异常', value: 1 },
            { type: '浊度异常', value: 1 },
            { type: '设备故障', value: 3 },
          ],
          deviceFaultTrend: {
            days: ['5-26', '5-27', '5-28', '5-29', '5-30', '5-31', '6-1'],
            faults: [1, 2, 1, 3, 2, 1, 2],
          },
          waterUsage: {
            months: ['1月', '2月', '3月', '4月', '5月', '6月'],
            usage: [12000, 13500, 12800, 14000, 13200, 13800],
            fee: [36000, 40500, 38400, 42000, 39600, 41400],
          },
          reportContent: [
            {
              title: '水务运行总体分析',
              content: '本报告期内，邹城市水务运行平稳，水质达标率保持在98%以上，主要水质指标均符合国家标准。设备运维及时，管网运行安全可靠。',
            },
            {
              title: '水质状况分析',
              content: 'PH值、溶解氧、浊度等主要指标波动小，整体水质优良。部分监测点出现短时异常，已及时处理。',
            },
            {
              title: '设备运维与管网管理',
              content: '设备故障率低，维护及时。管网巡检覆盖率100%，未发生大范围漏损。',
            },
            {
              title: '用水量与水费分析',
              content: '本期用水总量同比增长5%，水费收缴率达99%。重点区域用水量增长明显。',
            },
            {
              title: '存在问题及建议',
              content: `1. 个别监测点偶发异常，建议加强实时监控。
2. 设备老化需关注，建议制定更新计划。
3. 持续优化管网维护，提升供水保障能力。`,
            },
          ],
        });
      }, 2000);
    });
  };

  // 生成报告
  const generateReport = async () => {
    setLoading(true);
    try {
      const data = await fetchReportData();
      setReportData(data);
      message.success('报告生成成功！');
    } catch (error) {
      message.error('报告生成失败，请重试！');
    } finally {
      setLoading(false);
    }
  };

  // 下载报告
  const downloadReport = async () => {
    if (!reportData) {
      message.warning('请先生成报告！');
      return;
    }

    setDownloading(true);
    try {
      if (!reportRef.current) {
        throw new Error('报告内容不存在');
      }

      // 创建PDF文档
      const pdf = new jsPDF('p', 'mm', 'a4');
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      // 计算PDF页面大小
      const imgWidth = 210; // A4纸的宽度
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = 297; // A4纸的高度
      let heightLeft = imgHeight;
      let position = 0;

      // 添加报告标题
      pdf.setFontSize(20);
      pdf.text('邹城市水务大数据分析报告', 105, 20, { align: 'center' });
      pdf.setFontSize(12);
      pdf.text(
        `报告期间：${dateRange[0].format('YYYY-MM-DD')} 至 ${dateRange[1].format('YYYY-MM-DD')}`,
        105,
        30,
        { align: 'center' }
      );

      // 添加报告内容
      pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 40, imgWidth, imgHeight);

      // 如果内容超过一页，自动添加新页面
      while (heightLeft >= pageHeight) {
        position = heightLeft - pageHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, -position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // 生成文件名
      const fileName = `邹城市水务大数据分析报告_${dateRange[0].format('YYYYMMDD')}_${dateRange[1].format('YYYYMMDD')}.pdf`;

      // 保存PDF
      pdf.save(fileName);
      message.success('报告下载成功！');
    } catch (error) {
      console.error('下载报告失败:', error);
      message.error('下载报告失败，请重试！');
    } finally {
      setDownloading(false);
    }
  };

  // 水质趋势图表配置
  const getWaterQualityTrendOption = () => ({
    title: { text: '水质指标趋势', left: 'center', top: 10 },
    tooltip: { trigger: 'axis' },
    legend: { data: ['PH值', '溶解氧', '浊度'], top: 40 },
    xAxis: { type: 'category', data: reportData?.waterQualityTrend.days || [] },
    yAxis: { type: 'value' },
    series: [
      { name: 'PH值', type: 'line', data: reportData?.waterQualityTrend.ph || [] },
      { name: '溶解氧', type: 'line', data: reportData?.waterQualityTrend.oxygen || [] },
      { name: '浊度', type: 'line', data: reportData?.waterQualityTrend.turbidity || [] },
    ],
  });

  // 异常类型分布
  const getAbnormalStatsOption = () => ({
    title: { text: '异常类型分布', left: 'center' },
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: reportData?.abnormalStats || [],
      },
    ],
  });

  // 设备故障趋势
  const getDeviceFaultTrendOption = () => ({
    title: { text: '设备故障趋势', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: reportData?.deviceFaultTrend.days || [] },
    yAxis: { type: 'value' },
    series: [
      { name: '故障数', type: 'bar', data: reportData?.deviceFaultTrend.faults || [] },
    ],
  });

  // 用水量与水费趋势
  const getWaterUsageOption = () => ({
    title: { text: '用水量与水费趋势', left: 'center' },
    tooltip: { trigger: 'axis' },
    legend: { data: ['用水量', '水费'] },
    xAxis: { type: 'category', data: reportData?.waterUsage.months || [] },
    yAxis: { type: 'value' },
    series: [
      { name: '用水量', type: 'line', data: reportData?.waterUsage.usage || [] },
      { name: '水费', type: 'line', data: reportData?.waterUsage.fee || [] },
    ],
  });

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Row gutter={[16, 16]} align="middle">
          <Col span={24}>
            <Alert
              message="操作提示"
              description={
                <div>
                  <p>1. 选择报告类型（月度/季度/年度/管网/用水量）</p>
                  <p>2. 选择报告时间范围</p>
                  <p>3. 点击"生成报告"按钮，系统将自动生成分析报告</p>
                  <p>4. 报告生成后，可以点击"下载报告"保存报告</p>
                </div>
              }
              type="info"
              showIcon
              style={{ marginBottom: '16px' }}
            />
          </Col>
          <Col span={6}>
            <Select
              style={{ width: '100%' }}
              value={reportType}
              onChange={setReportType}
              options={reportTypes}
            />
          </Col>
          <Col span={8}>
            <RangePicker
              value={dateRange}
              onChange={(dates) => {
                if (dates && dates[0] && dates[1]) {
                  setDateRange([dates[0], dates[1]]);
                }
              }}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={10}>
            <Space>
              <Button
                type="primary"
                icon={<FileTextOutlined />}
                onClick={generateReport}
                loading={loading}
              >
                生成报告
              </Button>
              <Button
                icon={<DownloadOutlined />}
                onClick={downloadReport}
                disabled={!reportData}
                loading={downloading}
              >
                下载报告
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Divider />

      <Spin spinning={loading}>
        {reportData && (
          <div ref={reportRef}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card>
                  <Title level={4}>邹城市水务大数据分析报告</Title>
                  <Paragraph>
                    报告期间：{dateRange[0].format('YYYY-MM-DD')} 至 {dateRange[1].format('YYYY-MM-DD')}
                  </Paragraph>
                </Card>
              </Col>

              <Col span={24}>
                <Card>
                  {reportData.reportContent.map((item, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                      <Title level={5}>{item.title}</Title>
                      <Paragraph>{item.content}</Paragraph>
                    </div>
                  ))}
                </Card>
              </Col>

              <Col span={12}>
                <Card title="水质指标趋势">
                  <ReactECharts option={getWaterQualityTrendOption()} style={{ height: '300px' }} />
                </Card>
              </Col>

              <Col span={12}>
                <Card title="异常类型分布">
                  <ReactECharts option={getAbnormalStatsOption()} style={{ height: '300px' }} />
                </Card>
              </Col>

              <Col span={12}>
                <Card title="设备故障趋势">
                  <ReactECharts option={getDeviceFaultTrendOption()} style={{ height: '300px' }} />
                </Card>
              </Col>

              <Col span={12}>
                <Card title="用水量与水费趋势">
                  <ReactECharts option={getWaterUsageOption()} style={{ height: '300px' }} />
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Spin>
    </div>
  );
};

export default SmartReport; 