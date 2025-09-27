import api from './api';
import { ApiResponse, Vehicle, Driver } from '../types';

export const fleetService = {
  getVehicles: async (): Promise<ApiResponse<Vehicle[]>> => {
    const response = await api.get('/fleet/vehicles');
    return response.data;
  },

  getDrivers: async (): Promise<ApiResponse<Driver[]>> => {
    const response = await api.get('/fleet/drivers');
    return response.data;
  },
};