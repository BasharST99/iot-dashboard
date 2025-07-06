import apiClient from './client';
import { Device } from '../types/device';

export const fetchDevices = async (): Promise<Device[]> => {
    const response = await apiClient.get('/devices'); 
    return response.data;
  };
  
  export const addDevice = async (device: Omit<Device, 'id' | 'created_at'>): Promise<Device> => {
    const response = await apiClient.post('/devices', device); 
    return response.data;
  };
  
  export const deleteDevice = async (id: string): Promise<void> => {
    await apiClient.delete(`/devices/${id}`); 
  };