import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export interface DashboardData {
  totalPopulation: number;
  employedCount: number;
  companyCount: number;
  insuredCount: number;
}

export interface SearchParams {
  name?: string;
  idCard?: string;
  employmentStatus?: string;
  insuranceStatus?: string;
}

export interface SearchResult {
  key: string;
  name: string;
  idCard: string;
  employmentStatus: string;
  insuranceStatus: string;
}

export const dataService = {
  // 获取仪表盘数据
  getDashboardData: async (): Promise<DashboardData> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard`);
      return response.data;
    } catch (error) {
      console.error('获取仪表盘数据失败:', error);
      throw error;
    }
  },

  // 搜索人员信息
  searchPeople: async (params: SearchParams): Promise<SearchResult[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search`, { params });
      return response.data;
    } catch (error) {
      console.error('搜索人员信息失败:', error);
      throw error;
    }
  },

  // 获取就业趋势数据
  getEmploymentTrend: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trend`);
      return response.data;
    } catch (error) {
      console.error('获取就业趋势数据失败:', error);
      throw error;
    }
  },

  // 获取人口分布数据
  getPopulationDistribution: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/distribution`);
      return response.data;
    } catch (error) {
      console.error('获取人口分布数据失败:', error);
      throw error;
    }
  },
}; 