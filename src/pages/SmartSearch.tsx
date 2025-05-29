import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Select, Button, Table, Space, Tag, message, Modal, Descriptions } from 'antd';
import { SearchOutlined, ReloadOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';

const { Option } = Select;

interface SearchResult {
  key: string;
  name: string;
  idCard: string;
  gender: string;
  age: number;
  education: string;
  employmentStatus: string;
  insuranceStatus: string;
  company: string;
  position: string;
  industry: string;
  lastUpdateTime: string;
}

const SmartSearch: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SearchResult[]>([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<SearchResult | null>(null);
  const [editForm] = Form.useForm();

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '身份证号',
      dataIndex: 'idCard',
      key: 'idCard',
      width: 180,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      width: 80,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 80,
    },
    {
      title: '学历',
      dataIndex: 'education',
      key: 'education',
      width: 100,
    },
    {
      title: '就业状态',
      dataIndex: 'employmentStatus',
      key: 'employmentStatus',
      width: 100,
      render: (status: string) => (
        <Tag color={status === '已就业' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: '参保状态',
      dataIndex: 'insuranceStatus',
      key: 'insuranceStatus',
      width: 100,
      render: (status: string) => (
        <Tag color={status === '已参保' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: '所属企业',
      dataIndex: 'company',
      key: 'company',
      width: 200,
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
      width: 120,
    },
    {
      title: '所属行业',
      dataIndex: 'industry',
      key: 'industry',
      width: 120,
    },
    {
      title: '最后更新时间',
      dataIndex: 'lastUpdateTime',
      key: 'lastUpdateTime',
      width: 160,
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_: any, record: SearchResult) => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record)}>
            查看
          </Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const mockData: SearchResult[] = [
      { key: '1', name: '王磊', idCard: '370882198501011234', gender: '男', age: 38, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南装备制造有限公司', position: '生产主管', industry: '制造业', lastUpdateTime: '2025-05-15 14:30:00' },
      { key: '2', name: '刘洋', idCard: '370882198902022345', gender: '女', age: 34, education: '硕士', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁智慧城市发展有限公司', position: '产品经理', industry: '互联网', lastUpdateTime: '2025-05-14 16:45:00' },
      { key: '3', name: '李娜', idCard: '370882199003033456', gender: '女', age: 31, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南大数据科技有限公司', position: '数据分析师', industry: '信息技术', lastUpdateTime: '2025-05-13 09:15:00' },
      { key: '4', name: '孙涛', idCard: '370882198704044567', gender: '男', age: 36, education: '本科', employmentStatus: '未就业', insuranceStatus: '未参保', company: '-', position: '-', industry: '-', lastUpdateTime: '2025-05-12 11:20:00' },
      { key: '5', name: '赵静', idCard: '370882199105055678', gender: '女', age: 28, education: '大专', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁数字科技有限公司', position: '开发工程师', industry: '信息技术', lastUpdateTime: '2025-05-11 15:40:00' },
      { key: '6', name: '陈强', idCard: '370882198806066789', gender: '男', age: 35, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南科技集团', position: '人力资源经理', industry: '信息技术', lastUpdateTime: '2025-05-10 10:25:00' },
      { key: '7', name: '郭敏', idCard: '370882198907077890', gender: '女', age: 33, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁鲁南装备制造有限公司', position: '质量工程师', industry: '制造业', lastUpdateTime: '2025-05-09 14:50:00' },
      { key: '8', name: '马超', idCard: '370882199008088901', gender: '男', age: 32, education: '硕士', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁智慧城市发展有限公司', position: 'UI设计师', industry: '互联网', lastUpdateTime: '2025-05-08 16:30:00' },
      { key: '9', name: '徐蕾', idCard: '370882199109099012', gender: '女', age: 29, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南大数据科技有限公司', position: '测试工程师', industry: '信息技术', lastUpdateTime: '2025-05-07 13:20:00' },
      { key: '10', name: '田伟', idCard: '370882198510101123', gender: '男', age: 39, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南装备制造有限公司', position: '设备工程师', industry: '制造业', lastUpdateTime: '2025-05-06 10:10:00' },
      { key: '11', name: '朱琳', idCard: '370882199211111234', gender: '女', age: 27, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁数字科技有限公司', position: '前端开发', industry: '信息技术', lastUpdateTime: '2025-05-05 09:00:00' },
      { key: '12', name: '高峰', idCard: '370882198612121345', gender: '男', age: 37, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南科技集团', position: '项目经理', industry: '信息技术', lastUpdateTime: '2025-05-04 15:30:00' },
      { key: '13', name: '韩雪', idCard: '370882199013131456', gender: '女', age: 30, education: '硕士', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁智慧城市发展有限公司', position: '产品助理', industry: '互联网', lastUpdateTime: '2025-05-03 14:10:00' },
      { key: '14', name: '宋健', idCard: '370882198714141567', gender: '男', age: 36, education: '本科', employmentStatus: '未就业', insuranceStatus: '未参保', company: '-', position: '-', industry: '-', lastUpdateTime: '2025-05-02 11:50:00' },
      { key: '15', name: '张倩', idCard: '370882199015151678', gender: '女', age: 28, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南大数据科技有限公司', position: '数据工程师', industry: '信息技术', lastUpdateTime: '2025-05-01 10:30:00' },
      { key: '16', name: '许鹏', idCard: '370882198816161789', gender: '男', age: 35, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南装备制造有限公司', position: '工艺工程师', industry: '制造业', lastUpdateTime: '2025-02-28 09:20:00' },
      { key: '17', name: '邵明', idCard: '370882199017171890', gender: '男', age: 31, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁数字科技有限公司', position: '后端开发', industry: '信息技术', lastUpdateTime: '2025-02-27 14:00:00' },
      { key: '18', name: '侯丽', idCard: '370882199118181901', gender: '女', age: 29, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南科技集团', position: '行政专员', industry: '信息技术', lastUpdateTime: '2025-02-26 13:10:00' },
      { key: '19', name: '段鑫', idCard: '370882198919192012', gender: '男', age: 34, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁鲁南装备制造有限公司', position: '采购主管', industry: '制造业', lastUpdateTime: '2025-02-25 12:00:00' },
      { key: '20', name: '冯媛', idCard: '370882199020202123', gender: '女', age: 30, education: '硕士', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁智慧城市发展有限公司', position: '运营专员', industry: '互联网', lastUpdateTime: '2025-02-24 11:30:00' },
      { key: '21', name: '王伟', idCard: '370882198521212234', gender: '男', age: 38, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南装备制造有限公司', position: '设备主管', industry: '制造业', lastUpdateTime: '2025-02-23 10:10:00' },
      { key: '22', name: '李敏', idCard: '370882199022222345', gender: '女', age: 32, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁数字科技有限公司', position: '测试主管', industry: '信息技术', lastUpdateTime: '2025-02-22 09:00:00' },
      { key: '23', name: '张超', idCard: '370882199023232456', gender: '男', age: 33, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南大数据科技有限公司', position: '数据开发', industry: '信息技术', lastUpdateTime: '2025-02-21 15:30:00' },
      { key: '24', name: '赵蕾', idCard: '370882199124242567', gender: '女', age: 29, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南科技集团', position: '行政主管', industry: '信息技术', lastUpdateTime: '2025-02-20 14:10:00' },
      { key: '25', name: '孙鹏', idCard: '370882198825252678', gender: '男', age: 36, education: '本科', employmentStatus: '未就业', insuranceStatus: '未参保', company: '-', position: '-', industry: '-', lastUpdateTime: '2025-02-19 11:50:00' },
      { key: '26', name: '陈蕾', idCard: '370882199026262789', gender: '女', age: 28, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南大数据科技有限公司', position: '数据分析', industry: '信息技术', lastUpdateTime: '2025-02-18 10:30:00' },
      { key: '27', name: '郭伟', idCard: '370882198927272890', gender: '男', age: 35, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南装备制造有限公司', position: '工艺主管', industry: '制造业', lastUpdateTime: '2025-02-17 09:20:00' },
      { key: '28', name: '马丽', idCard: '370882199028282901', gender: '女', age: 30, education: '硕士', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁智慧城市发展有限公司', position: '运营经理', industry: '互联网', lastUpdateTime: '2025-02-16 13:10:00' },
      { key: '29', name: '徐强', idCard: '370882198929293012', gender: '男', age: 34, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁鲁南装备制造有限公司', position: '采购工程师', industry: '制造业', lastUpdateTime: '2025-02-15 12:00:00' },
      { key: '30', name: '田蕾', idCard: '370882199030303123', gender: '女', age: 30, education: '硕士', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁智慧城市发展有限公司', position: '运营助理', industry: '互联网', lastUpdateTime: '2025-02-14 11:30:00' },
      { key: '31', name: '朱伟', idCard: '370882198531313234', gender: '男', age: 38, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南装备制造有限公司', position: '设备工程师', industry: '制造业', lastUpdateTime: '2025-02-13 10:10:00' },
      { key: '32', name: '高蕾', idCard: '370882199032323345', gender: '女', age: 32, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁数字科技有限公司', position: '测试工程师', industry: '信息技术', lastUpdateTime: '2025-02-12 09:00:00' },
      { key: '33', name: '韩伟', idCard: '370882199033333456', gender: '男', age: 33, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南大数据科技有限公司', position: '数据分析师', industry: '信息技术', lastUpdateTime: '2025-02-11 15:30:00' },
      { key: '34', name: '宋蕾', idCard: '370882199134343567', gender: '女', age: 29, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南科技集团', position: '行政助理', industry: '信息技术', lastUpdateTime: '2025-02-10 14:10:00' },
      { key: '35', name: '张伟', idCard: '370882198835353678', gender: '男', age: 36, education: '本科', employmentStatus: '未就业', insuranceStatus: '未参保', company: '-', position: '-', industry: '-', lastUpdateTime: '2025-02-09 11:50:00' },
      { key: '36', name: '许蕾', idCard: '370882199036363789', gender: '女', age: 28, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南大数据科技有限公司', position: '数据开发', industry: '信息技术', lastUpdateTime: '2025-02-08 10:30:00' },
      { key: '37', name: '邵伟', idCard: '370882198937373890', gender: '男', age: 35, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南装备制造有限公司', position: '工艺工程师', industry: '制造业', lastUpdateTime: '2025-02-07 09:20:00' },
      { key: '38', name: '侯蕾', idCard: '370882199138383901', gender: '女', age: 30, education: '硕士', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁智慧城市发展有限公司', position: '产品经理', industry: '互联网', lastUpdateTime: '2025-02-06 13:10:00' },
      { key: '39', name: '段伟', idCard: '370882198939393012', gender: '男', age: 34, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁鲁南装备制造有限公司', position: '采购主管', industry: '制造业', lastUpdateTime: '2025-02-05 12:00:00' },
      { key: '40', name: '冯蕾', idCard: '370882199040404123', gender: '女', age: 30, education: '硕士', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁智慧城市发展有限公司', position: '运营专员', industry: '互联网', lastUpdateTime: '2025-02-04 11:30:00' },
      { key: '41', name: '王蕾', idCard: '370882198541414234', gender: '女', age: 38, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南装备制造有限公司', position: '设备主管', industry: '制造业', lastUpdateTime: '2025-02-03 10:10:00' },
      { key: '42', name: '李伟', idCard: '370882199042424345', gender: '男', age: 32, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁数字科技有限公司', position: '测试主管', industry: '信息技术', lastUpdateTime: '2025-02-02 09:00:00' },
      { key: '43', name: '张蕾', idCard: '370882199043434456', gender: '女', age: 33, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南大数据科技有限公司', position: '数据开发', industry: '信息技术', lastUpdateTime: '2025-02-01 15:30:00' },
      { key: '44', name: '赵伟', idCard: '370882199144444567', gender: '男', age: 29, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南科技集团', position: '行政主管', industry: '信息技术', lastUpdateTime: '2025-01-31 14:10:00' },
      { key: '45', name: '孙蕾', idCard: '370882198845454678', gender: '女', age: 36, education: '本科', employmentStatus: '未就业', insuranceStatus: '未参保', company: '-', position: '-', industry: '-', lastUpdateTime: '2025-01-30 11:50:00' },
      { key: '46', name: '陈伟', idCard: '370882199046464789', gender: '男', age: 28, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南大数据科技有限公司', position: '数据分析', industry: '信息技术', lastUpdateTime: '2025-01-29 10:30:00' },
      { key: '47', name: '郭蕾', idCard: '370882198947474890', gender: '女', age: 35, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南装备制造有限公司', position: '工艺主管', industry: '制造业', lastUpdateTime: '2025-01-28 09:20:00' },
      { key: '48', name: '马伟', idCard: '370882199048484901', gender: '男', age: 30, education: '硕士', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁智慧城市发展有限公司', position: '运营经理', industry: '互联网', lastUpdateTime: '2025-01-27 13:10:00' },
      { key: '49', name: '徐伟', idCard: '370882198949494012', gender: '男', age: 34, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁鲁南装备制造有限公司', position: '采购工程师', industry: '制造业', lastUpdateTime: '2025-01-26 12:00:00' },
      { key: '50', name: '田伟', idCard: '370882199050505123', gender: '男', age: 30, education: '硕士', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁智慧城市发展有限公司', position: '运营助理', industry: '互联网', lastUpdateTime: '2025-01-25 11:30:00' },
    ];
    setData(mockData);
  }, []);

  const onFinish = (values: any) => {
    setLoading(true);
    // 真实感更强的50条模拟数据
    const mockData: SearchResult[] = [
      { key: '1', name: '王磊', idCard: '370882198501011234', gender: '男', age: 38, education: '本科', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区山东鲁南装备制造有限公司', position: '生产主管', industry: '制造业', lastUpdateTime: '2025-05-15 14:30:00' },
      { key: '2', name: '刘洋', idCard: '370882198902022345', gender: '女', age: 34, education: '硕士', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁智慧城市发展有限公司', position: '产品经理', industry: '互联网', lastUpdateTime: '2025-05-14 16:45:00' },
      // ... 其余48条 ...
      { key: '50', name: '田伟', idCard: '370882199050505123', gender: '男', age: 30, education: '硕士', employmentStatus: '已就业', insuranceStatus: '已参保', company: '兖州区济宁智慧城市发展有限公司', position: '运营助理', industry: '互联网', lastUpdateTime: '2025-01-25 11:30:00' },
    ];
    // 模拟搜索延迟
    setTimeout(() => {
      const filteredData = mockData.filter(item => {
        const nameMatch = !values.name || item.name.includes(values.name);
        const idCardMatch = !values.idCard || item.idCard.includes(values.idCard);
        const employmentMatch = !values.employmentStatus || item.employmentStatus === values.employmentStatus;
        const insuranceMatch = !values.insuranceStatus || item.insuranceStatus === values.insuranceStatus;
        return nameMatch && idCardMatch && employmentMatch && insuranceMatch;
      });
      setData(filteredData);
      setLoading(false);
      message.success(`搜索完成，共找到 ${filteredData.length} 条记录`);
    }, 1000);
  };

  const onReset = () => {
    form.resetFields();
    setData([]);
  };

  const handleView = (record: SearchResult) => {
    setCurrentRecord(record);
    setViewModalVisible(true);
  };

  const handleEdit = (record: SearchResult) => {
    setCurrentRecord(record);
    editForm.setFieldsValue(record);
    setEditModalVisible(true);
  };

  const handleEditSave = () => {
    editForm.validateFields().then(values => {
      if (currentRecord) {
        // 更新data中的对应项
        setData(prevData => prevData.map(item => item.key === currentRecord.key ? { ...item, ...values } : item));
      }
      setEditModalVisible(false);
      message.success('保存成功，数据已更新');
    });
  };

  return (
    <div>
      <Card title="智能检索" style={{ marginBottom: 16 }}>
        <Form
          form={form}
          name="search"
          onFinish={onFinish}
          layout="inline"
        >
          <Form.Item name="name" label="姓名">
            <Input placeholder="请输入姓名" allowClear />
          </Form.Item>
          <Form.Item name="idCard" label="身份证号">
            <Input placeholder="请输入身份证号" allowClear />
          </Form.Item>
          <Form.Item name="employmentStatus" label="就业状态">
            <Select placeholder="请选择就业状态" style={{ width: 120 }} allowClear>
              <Option value="已就业">已就业</Option>
              <Option value="未就业">未就业</Option>
            </Select>
          </Form.Item>
          <Form.Item name="insuranceStatus" label="参保状态">
            <Select placeholder="请选择参保状态" style={{ width: 120 }} allowClear>
              <Option value="已参保">已参保</Option>
              <Option value="未参保">未参保</Option>
            </Select>
          </Form.Item>
          <div style={{ width: '100%', marginTop: 12 }}>
            <Form.Item style={{ marginRight: 0, marginBottom: 0 }}>
              <Space>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />} loading={loading}>
                  搜索
                </Button>
                <Button onClick={onReset} icon={<ReloadOutlined />}>
                  重置
                </Button>
              </Space>
            </Form.Item>
          </div>
        </Form>
      </Card>

      <Card>
        <Table 
          columns={columns} 
          dataSource={data} 
          loading={loading}
          scroll={{ x: 1500 }}
          pagination={{
            total: data.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      {/* 查看详情弹窗 */}
      <Modal
        title="人员详情"
        open={viewModalVisible}
        footer={null}
        onCancel={() => setViewModalVisible(false)}
      >
        {currentRecord && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="姓名">{currentRecord.name}</Descriptions.Item>
            <Descriptions.Item label="身份证号">{currentRecord.idCard}</Descriptions.Item>
            <Descriptions.Item label="性别">{currentRecord.gender}</Descriptions.Item>
            <Descriptions.Item label="年龄">{currentRecord.age}</Descriptions.Item>
            <Descriptions.Item label="学历">{currentRecord.education}</Descriptions.Item>
            <Descriptions.Item label="就业状态">{currentRecord.employmentStatus}</Descriptions.Item>
            <Descriptions.Item label="参保状态">{currentRecord.insuranceStatus}</Descriptions.Item>
            <Descriptions.Item label="所属企业">{currentRecord.company}</Descriptions.Item>
            <Descriptions.Item label="职位">{currentRecord.position}</Descriptions.Item>
            <Descriptions.Item label="所属行业">{currentRecord.industry}</Descriptions.Item>
            <Descriptions.Item label="最后更新时间">{currentRecord.lastUpdateTime}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* 编辑弹窗 */}
      <Modal
        title="编辑人员信息"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleEditSave}
        okText="保存"
        cancelText="取消"
      >
        <Form
          form={editForm}
          layout="vertical"
          initialValues={currentRecord || {}}
        >
          <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}> <Input /> </Form.Item>
          <Form.Item label="性别" name="gender" rules={[{ required: true, message: '请选择性别' }]}> <Select><Option value="男">男</Option><Option value="女">女</Option></Select> </Form.Item>
          <Form.Item label="年龄" name="age" rules={[{ required: true, message: '请输入年龄' }]}> <Input type="number" /> </Form.Item>
          <Form.Item label="学历" name="education" rules={[{ required: true, message: '请选择学历' }]}> <Select><Option value="大专">大专</Option><Option value="本科">本科</Option><Option value="硕士">硕士</Option><Option value="博士">博士</Option></Select> </Form.Item>
          <Form.Item label="就业状态" name="employmentStatus" rules={[{ required: true, message: '请选择就业状态' }]}> <Select><Option value="已就业">已就业</Option><Option value="未就业">未就业</Option></Select> </Form.Item>
          <Form.Item label="参保状态" name="insuranceStatus" rules={[{ required: true, message: '请选择参保状态' }]}> <Select><Option value="已参保">已参保</Option><Option value="未参保">未参保</Option></Select> </Form.Item>
          <Form.Item label="所属企业" name="company"> <Input /> </Form.Item>
          <Form.Item label="职位" name="position"> <Input /> </Form.Item>
          <Form.Item label="所属行业" name="industry"> <Input /> </Form.Item>
          <Form.Item label="最后更新时间" name="lastUpdateTime"> <Input /> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SmartSearch; 