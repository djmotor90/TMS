import api from './api';
import { ApiResponse, DashboardData } from '../types';

export const dashboardService = {
  getOverview: async (): Promise<ApiResponse<DashboardData>> => {
    const response = await api.get('/dashboard/overview');
    return response.data;
  },
};