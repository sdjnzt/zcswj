import React, { useState } from 'react';
import { Card, Row, Col, Descriptions, Tabs, Statistic, Progress, Table, Input, Select, Space, Button, Modal } from 'antd';
import { UserOutlined, TeamOutlined, TrophyOutlined, EyeOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

// 定义员工数据类型
interface Employee {
  id: string;
  name: string;
  gender: string;
  age: number;
  education: string;
  position: string;
  company: string;
  industry: string;
  entryDate: string;
  workYears: string;
  salary: string;
  performance: number;
  skills: number[];
  projects: number;
  awards: number;
  workExperience: {
    key: string;
    company: string;
    position: string;
    period: string;
    description: string;
  }[];
  training: {
    key: string;
    course: string;
    time: string;
    score: string;
  }[];
}

// 模拟全区人力资源数据
const employeeList: Employee[] = [
  {
    id: '1',
    name: '陈明',
    gender: '男',
    age: 35,
    education: '本科',
    position: '高级工程师',
    company: '兖州区山东鲁南大数据科技有限公司',
    industry: '信息技术',
    entryDate: '2018-06-15',
    workYears: '5年',
    salary: '15000',
    performance: 85,
    skills: [85, 90, 88, 75, 92],
    projects: 12,
    awards: 3,
    workExperience: [
      {
        key: '1',
        company: '兖州区山东鲁南大数据科技有限公司',
        position: '高级工程师',
        period: '2018-06 至 2023-03',
        description: '负责智慧城市平台开发，带领团队完成多个重要项目',
      },
      {
        key: '2',
        company: '兖州区济宁数字科技有限公司',
        position: '开发工程师',
        period: '2015-07 至 2018-05',
        description: '参与政务服务平台开发，负责数据交换模块',
      },
    ],
    training: [
      {
        key: '1',
        course: '高级项目管理',
        time: '2022-06',
        score: '优秀',
      },
      {
        key: '2',
        course: '技术架构设计',
        time: '2021-12',
        score: '良好',
      },
    ],
  },
  {
    id: '2',
    name: '王丽',
    gender: '女',
    age: 28,
    education: '硕士',
    position: '产品经理',
    company: '兖州区济宁智慧城市发展有限公司',
    industry: '互联网',
    entryDate: '2020-03-01',
    workYears: '3年',
    salary: '12000',
    performance: 92,
    skills: [88, 95, 85, 90, 88],
    projects: 8,
    awards: 2,
    workExperience: [
      {
        key: '1',
        company: '兖州区济宁智慧城市发展有限公司',
        position: '产品经理',
        period: '2020-03 至 2023-03',
        description: '负责智慧城市应用产品规划和设计，推动产品迭代优化',
      },
    ],
    training: [
      {
        key: '1',
        course: '产品设计思维',
        time: '2022-09',
        score: '优秀',
      },
    ],
  },
  {
    id: '3',
    name: '刘建国',
    gender: '男',
    age: 42,
    education: '博士',
    position: '技术总监',
    company: '兖州区山东鲁南科技集团',
    industry: '信息技术',
    entryDate: '2015-01-01',
    workYears: '8年',
    salary: '25000',
    performance: 95,
    skills: [95, 88, 92, 90, 95],
    projects: 20,
    awards: 5,
    workExperience: [
      {
        key: '1',
        company: '兖州区山东鲁南科技集团',
        position: '技术总监',
        period: '2015-01 至 2023-03',
        description: '负责公司技术战略规划，管理技术团队，推动技术创新',
      },
    ],
    training: [
      {
        key: '1',
        course: '高级技术管理',
        time: '2022-03',
        score: '优秀',
      },
    ],
  },
  {
    id: '4',
    name: '张伟',
    gender: '男',
    age: 38,
    education: '本科',
    position: '生产主管',
    company: '兖州区济宁鲁南装备制造有限公司',
    industry: '制造业',
    entryDate: '2016-03-15',
    workYears: '7年',
    salary: '18000',
    performance: 88,
    skills: [90, 85, 92, 88, 90],
    projects: 15,
    awards: 4,
    workExperience: [
      {
        key: '1',
        company: '兖州区济宁鲁南装备制造有限公司',
        position: '生产主管',
        period: '2016-03 至 2023-03',
        description: '负责智能装备生产线管理和优化，提高生产效率和质量',
      },
    ],
    training: [
      {
        key: '1',
        course: '精益生产管理',
        time: '2022-08',
        score: '优秀',
      },
    ],
  },
  {
    id: '5',
    name: '李娜',
    gender: '女',
    age: 32,
    education: '硕士',
    position: '财务经理',
    company: '兖州区济宁鲁南国际贸易有限公司',
    industry: '贸易',
    entryDate: '2019-05-20',
    workYears: '4年',
    salary: '16000',
    performance: 90,
    skills: [92, 88, 85, 90, 88],
    projects: 10,
    awards: 3,
    workExperience: [
      {
        key: '1',
        company: '兖州区济宁鲁南国际贸易有限公司',
        position: '财务经理',
        period: '2019-05 至 2023-03',
        description: '负责公司财务管理和预算控制，优化财务流程',
      },
    ],
    training: [
      {
        key: '1',
        course: '高级财务管理',
        time: '2022-11',
        score: '优秀',
      },
    ],
  },
  {
    id: '6',
    name: '周强',
    gender: '男',
    age: 36,
    education: '本科',
    position: '研发工程师',
    company: '兖州区山东鲁南大数据科技有限公司',
    industry: '信息技术',
    entryDate: '2019-08-15',
    workYears: '4年',
    salary: '14000',
    performance: 88,
    skills: [90, 85, 88, 82, 90],
    projects: 10,
    awards: 2,
    workExperience: [
      {
        key: '1',
        company: '兖州区山东鲁南大数据科技有限公司',
        position: '研发工程师',
        period: '2019-08 至 2023-03',
        description: '负责大数据平台核心模块开发，优化数据处理性能',
      },
    ],
    training: [
      {
        key: '1',
        course: '大数据技术应用',
        time: '2022-07',
        score: '优秀',
      },
    ],
  },
  {
    id: '7',
    name: '杨雪',
    gender: '女',
    age: 29,
    education: '硕士',
    position: '数据分析师',
    company: '兖州区济宁智慧城市发展有限公司',
    industry: '互联网',
    entryDate: '2021-03-01',
    workYears: '2年',
    salary: '11000',
    performance: 85,
    skills: [88, 90, 85, 92, 88],
    projects: 6,
    awards: 1,
    workExperience: [
      {
        key: '1',
        company: '兖州区济宁智慧城市发展有限公司',
        position: '数据分析师',
        period: '2021-03 至 2023-03',
        description: '负责城市运行数据分析，提供决策支持',
      },
    ],
    training: [
      {
        key: '1',
        course: '数据分析与可视化',
        time: '2022-10',
        score: '良好',
      },
    ],
  },
  {
    id: '8',
    name: '赵建国',
    gender: '男',
    age: 45,
    education: '本科',
    position: '生产总监',
    company: '兖州区济宁鲁南装备制造有限公司',
    industry: '制造业',
    entryDate: '2014-06-01',
    workYears: '9年',
    salary: '22000',
    performance: 93,
    skills: [95, 90, 92, 88, 95],
    projects: 25,
    awards: 6,
    workExperience: [
      {
        key: '1',
        company: '兖州区济宁鲁南装备制造有限公司',
        position: '生产总监',
        period: '2014-06 至 2023-03',
        description: '负责智能装备生产体系规划和管理，推动智能制造升级',
      },
    ],
    training: [
      {
        key: '1',
        course: '智能制造管理',
        time: '2022-05',
        score: '优秀',
      },
    ],
  },
  {
    id: '9',
    name: '孙丽华',
    gender: '女',
    age: 31,
    education: '本科',
    position: '人力资源经理',
    company: '兖州区山东鲁南科技集团',
    industry: '信息技术',
    entryDate: '2018-09-15',
    workYears: '5年',
    salary: '13000',
    performance: 89,
    skills: [85, 95, 90, 88, 92],
    projects: 8,
    awards: 2,
    workExperience: [
      {
        key: '1',
        company: '兖州区山东鲁南科技集团',
        position: '人力资源经理',
        period: '2018-09 至 2023-03',
        description: '负责集团人才招聘、培训和发展体系建设',
      },
    ],
    training: [
      {
        key: '1',
        course: '人力资源管理',
        time: '2022-08',
        score: '优秀',
      },
    ],
  },
  {
    id: '10',
    name: '王建国',
    gender: '男',
    age: 40,
    education: '硕士',
    position: '技术总监',
    company: '兖州区济宁数字科技有限公司',
    industry: '信息技术',
    entryDate: '2016-03-01',
    workYears: '7年',
    salary: '23000',
    performance: 94,
    skills: [96, 88, 90, 92, 94],
    projects: 18,
    awards: 4,
    workExperience: [
      {
        key: '1',
        company: '兖州区济宁数字科技有限公司',
        position: '技术总监',
        period: '2016-03 至 2023-03',
        description: '负责公司技术战略规划，推动数字化转型',
      },
    ],
    training: [
      {
        key: '1',
        course: '数字化转型管理',
        time: '2022-04',
        score: '优秀',
      },
    ],
  },
  {
    id: '11',
    name: '李强',
    gender: '男',
    age: 33,
    education: '本科',
    position: '销售经理',
    company: '兖州区济宁鲁南国际贸易有限公司',
    industry: '贸易',
    entryDate: '2017-05-20',
    workYears: '6年',
    salary: '15000',
    performance: 91,
    skills: [88, 95, 90, 92, 88],
    projects: 12,
    awards: 3,
    workExperience: [
      {
        key: '1',
        company: '兖州区济宁鲁南国际贸易有限公司',
        position: '销售经理',
        period: '2017-05 至 2023-03',
        description: '负责国际贸易业务拓展，管理销售团队',
      },
    ],
    training: [
      {
        key: '1',
        course: '国际贸易实务',
        time: '2022-09',
        score: '优秀',
      },
    ],
  },
  {
    id: '12',
    name: '张丽',
    gender: '女',
    age: 27,
    education: '硕士',
    position: 'UI设计师',
    company: '兖州区济宁智慧城市发展有限公司',
    industry: '互联网',
    entryDate: '2020-07-01',
    workYears: '3年',
    salary: '12000',
    performance: 87,
    skills: [92, 85, 88, 90, 85],
    projects: 9,
    awards: 2,
    workExperience: [
      {
        key: '1',
        company: '兖州区济宁智慧城市发展有限公司',
        position: 'UI设计师',
        period: '2020-07 至 2023-03',
        description: '负责智慧城市应用界面设计，提升用户体验',
      },
    ],
    training: [
      {
        key: '1',
        course: '用户体验设计',
        time: '2022-11',
        score: '良好',
      },
    ],
  },
  {
    id: '13',
    name: '刘明',
    gender: '男',
    age: 34,
    education: '本科',
    position: '质量工程师',
    company: '兖州区济宁鲁南装备制造有限公司',
    industry: '制造业',
    entryDate: '2018-03-15',
    workYears: '5年',
    salary: '13500',
    performance: 89,
    skills: [90, 88, 92, 85, 90],
    projects: 11,
    awards: 2,
    workExperience: [
      {
        key: '1',
        company: '兖州区济宁鲁南装备制造有限公司',
        position: '质量工程师',
        period: '2018-03 至 2023-03',
        description: '负责产品质量控制，建立质量管理体系',
      },
    ],
    training: [
      {
        key: '1',
        course: '质量管理体系',
        time: '2022-06',
        score: '优秀',
      },
    ],
  },
  {
    id: '14',
    name: '陈静',
    gender: '女',
    age: 30,
    education: '本科',
    position: '财务主管',
    company: '兖州区山东鲁南科技集团',
    industry: '信息技术',
    entryDate: '2019-01-10',
    workYears: '4年',
    salary: '12500',
    performance: 88,
    skills: [90, 85, 88, 92, 85],
    projects: 7,
    awards: 1,
    workExperience: [
      {
        key: '1',
        company: '兖州区山东鲁南科技集团',
        position: '财务主管',
        period: '2019-01 至 2023-03',
        description: '负责集团财务核算和预算管理',
      },
    ],
    training: [
      {
        key: '1',
        course: '财务分析与决策',
        time: '2022-12',
        score: '良好',
      },
    ],
  },
  {
    id: '15',
    name: '王强',
    gender: '男',
    age: 37,
    education: '硕士',
    position: '项目经理',
    company: '兖州区山东鲁南大数据科技有限公司',
    industry: '信息技术',
    entryDate: '2017-08-01',
    workYears: '6年',
    salary: '16000',
    performance: 90,
    skills: [88, 95, 92, 90, 88],
    projects: 15,
    awards: 3,
    workExperience: [
      {
        key: '1',
        company: '兖州区山东鲁南大数据科技有限公司',
        position: '项目经理',
        period: '2017-08 至 2023-03',
        description: '负责大数据平台项目实施，管理项目团队',
      },
    ],
    training: [
      {
        key: '1',
        course: '项目管理实践',
        time: '2022-07',
        score: '优秀',
      },
    ],
  },
  {
    id: '16',
    name: '李娜',
    gender: '女',
    age: 28,
    education: '本科',
    position: '市场专员',
    company: '兖州区济宁鲁南国际贸易有限公司',
    industry: '贸易',
    entryDate: '2020-04-15',
    workYears: '3年',
    salary: '10000',
    performance: 86,
    skills: [85, 92, 88, 90, 85],
    projects: 8,
    awards: 1,
    workExperience: [
      {
        key: '1',
        company: '兖州区济宁鲁南国际贸易有限公司',
        position: '市场专员',
        period: '2020-04 至 2023-03',
        description: '负责市场调研和营销活动策划',
      },
    ],
    training: [
      {
        key: '1',
        course: '市场营销策略',
        time: '2022-10',
        score: '良好',
      },
    ],
  },
  {
    id: '17',
    name: '张建国',
    gender: '男',
    age: 41,
    education: '本科',
    position: '运维总监',
    company: '兖州区济宁数字科技有限公司',
    industry: '信息技术',
    entryDate: '2015-09-01',
    workYears: '8年',
    salary: '20000',
    performance: 92,
    skills: [94, 88, 90, 92, 90],
    projects: 16,
    awards: 4,
    workExperience: [
      {
        key: '1',
        company: '兖州区济宁数字科技有限公司',
        position: '运维总监',
        period: '2015-09 至 2023-03',
        description: '负责公司IT基础设施运维管理，保障系统稳定运行',
      },
    ],
    training: [
      {
        key: '1',
        course: 'IT运维管理',
        time: '2022-08',
        score: '优秀',
      },
    ],
  },
  {
    id: '18',
    name: '王丽华',
    gender: '女',
    age: 32,
    education: '硕士',
    position: '研发主管',
    company: '兖州区山东鲁南科技集团',
    industry: '信息技术',
    entryDate: '2018-06-01',
    workYears: '5年',
    salary: '17000',
    performance: 91,
    skills: [93, 88, 90, 92, 88],
    projects: 13,
    awards: 3,
    workExperience: [
      {
        key: '1',
        company: '兖州区山东鲁南科技集团',
        position: '研发主管',
        period: '2018-06 至 2023-03',
        description: '负责核心技术研发，管理研发团队',
      },
    ],
    training: [
      {
        key: '1',
        course: '研发管理实践',
        time: '2022-09',
        score: '优秀',
      },
    ],
  },
  {
    id: '19',
    name: '刘强',
    gender: '男',
    age: 35,
    education: '本科',
    position: '生产经理',
    company: '兖州区济宁鲁南装备制造有限公司',
    industry: '制造业',
    entryDate: '2017-03-15',
    workYears: '6年',
    salary: '14500',
    performance: 89,
    skills: [90, 88, 92, 85, 90],
    projects: 14,
    awards: 2,
    workExperience: [
      {
        key: '1',
        company: '兖州区济宁鲁南装备制造有限公司',
        position: '生产经理',
        period: '2017-03 至 2023-03',
        description: '负责智能装备生产管理，优化生产流程',
      },
    ],
    training: [
      {
        key: '1',
        course: '生产运营管理',
        time: '2022-11',
        score: '良好',
      },
    ],
  },
  {
    id: '20',
    name: '陈娜',
    gender: '女',
    age: 29,
    education: '本科',
    position: '商务专员',
    company: '兖州区济宁鲁南国际贸易有限公司',
    industry: '贸易',
    entryDate: '2020-01-10',
    workYears: '3年',
    salary: '9500',
    performance: 85,
    skills: [88, 90, 85, 92, 88],
    projects: 7,
    awards: 1,
    workExperience: [
      {
        key: '1',
        company: '兖州区济宁鲁南国际贸易有限公司',
        position: '商务专员',
        period: '2020-01 至 2023-03',
        description: '负责国际贸易商务谈判和合同管理',
      },
    ],
    training: [
      {
        key: '1',
        course: '商务谈判技巧',
        time: '2022-12',
        score: '良好',
      },
    ],
  },
];

const SmartProfile: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(employeeList[0]);
  const [searchText, setSearchText] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 技能雷达图配置
  const getSkillRadarOption = (skills: number[]) => ({
    radar: {
      indicator: [
        { name: '专业技能', max: 100 },
        { name: '沟通能力', max: 100 },
        { name: '团队协作', max: 100 },
        { name: '创新能力', max: 100 },
        { name: '执行力', max: 100 },
      ],
    },
    series: [{
      type: 'radar',
      data: [{
        value: skills,
        name: '能力评估',
      }],
    }],
  });

  // 工作经历表格列配置
  const workColumns = [
    {
      title: '公司',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '时间段',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: '工作描述',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  // 人员列表表格列配置
  const employeeColumns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '所属企业',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry',
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '工作年限',
      dataIndex: 'workYears',
      key: 'workYears',
    },
    {
      title: '绩效评分',
      dataIndex: 'performance',
      key: 'performance',
      render: (text: number) => <Progress percent={text} size="small" />,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: Employee) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedEmployee(record);
            setIsModalVisible(true);
          }}
        >
          详情
        </Button>
      ),
    },
  ];

  // 过滤员工列表
  const filteredEmployees = employeeList.filter(employee => {
    const matchesSearch = employee.name.includes(searchText) || 
                         employee.position.includes(searchText) ||
                         employee.company.includes(searchText) ||
                         employee.industry.includes(searchText);
    const matchesIndustry = industryFilter === 'all' || employee.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  // 详情弹窗内容
  const detailContent = (
    <Row gutter={[16, 16]}>
      {/* 基本信息卡片 */}
      <Col span={24}>
        <Card>
          <Row gutter={16}>
            <Col span={6}>
              <div style={{ textAlign: 'center' }}>
                <UserOutlined style={{ fontSize: 64, color: '#1890ff' }} />
                <h2>{selectedEmployee.name}</h2>
                <p>{selectedEmployee.position}</p>
              </div>
            </Col>
            <Col span={18}>
              <Descriptions title="基本信息" bordered>
                <Descriptions.Item label="性别">{selectedEmployee.gender}</Descriptions.Item>
                <Descriptions.Item label="年龄">{selectedEmployee.age}</Descriptions.Item>
                <Descriptions.Item label="学历">{selectedEmployee.education}</Descriptions.Item>
                <Descriptions.Item label="所属企业">{selectedEmployee.company}</Descriptions.Item>
                <Descriptions.Item label="所属行业">{selectedEmployee.industry}</Descriptions.Item>
                <Descriptions.Item label="入职日期">{selectedEmployee.entryDate}</Descriptions.Item>
                <Descriptions.Item label="工作年限">{selectedEmployee.workYears}</Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Card>
      </Col>

      {/* 关键指标卡片 */}
      <Col span={24}>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="当前薪资"
                value={selectedEmployee.salary}
                prefix="￥"
                suffix="/月"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="绩效评分"
                value={selectedEmployee.performance}
                suffix="/100"
              />
              <Progress percent={selectedEmployee.performance} status="active" />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="项目参与"
                value={selectedEmployee.projects}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="获奖情况"
                value={selectedEmployee.awards}
                prefix={<TrophyOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </Col>

      {/* 详细信息标签页 */}
      <Col span={24}>
        <Card>
          <Tabs defaultActiveKey="1">
            <TabPane tab="能力评估" key="1">
              <ReactECharts option={getSkillRadarOption(selectedEmployee.skills)} style={{ height: '400px' }} />
            </TabPane>
            <TabPane tab="工作经历" key="2">
              <Table
                columns={workColumns}
                dataSource={selectedEmployee.workExperience}
                pagination={false}
              />
            </TabPane>
            <TabPane tab="培训记录" key="3">
              <Table
                columns={[
                  {
                    title: '培训课程',
                    dataIndex: 'course',
                    key: 'course',
                  },
                  {
                    title: '培训时间',
                    dataIndex: 'time',
                    key: 'time',
                  },
                  {
                    title: '培训成绩',
                    dataIndex: 'score',
                    key: 'score',
                  },
                ]}
                dataSource={selectedEmployee.training}
                pagination={false}
              />
            </TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  );

  return (
    <div>
      <Row gutter={[16, 16]}>
        {/* 搜索和筛选 */}
        <Col span={24}>
          <Card>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Space>
                <Search
                  placeholder="搜索姓名/职位/企业/行业"
                  allowClear
                  style={{ width: 300 }}
                  onChange={e => setSearchText(e.target.value)}
                />
                <Select
                  defaultValue="all"
                  style={{ width: 120 }}
                  onChange={value => setIndustryFilter(value)}
                >
                  <Option value="all">全部行业</Option>
                  <Option value="信息技术">信息技术</Option>
                  <Option value="互联网">互联网</Option>
                  <Option value="制造业">制造业</Option>
                  <Option value="贸易">贸易</Option>
                </Select>
              </Space>
            </Space>
          </Card>
        </Col>

        {/* 人员列表 */}
        <Col span={24}>
          <Card title="人员列表">
            <Table
              columns={employeeColumns}
              dataSource={filteredEmployees}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

      {/* 详情弹窗 */}
      <Modal
        title={`${selectedEmployee.name} - 详细信息`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={1200}
        footer={null}
      >
        {detailContent}
      </Modal>
    </div>
  );
};

export default SmartProfile; 