import api from './api';
import { LoginRequest, RegisterRequest, ApiResponse, User } from '../types';

export const authService = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<ApiResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};