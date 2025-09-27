import api from './api';
import { ApiResponse, Shipment } from '../types';

export const shipmentsService = {
  getShipments: async (): Promise<ApiResponse<Shipment[]>> => {
    const response = await api.get('/shipments');
    return response.data;
  },
};