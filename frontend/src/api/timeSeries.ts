import apiClient from './client';
import { TimeSeriesData } from '../types/timeSeries';

export const fetchTimeSeriesData = async (deviceId: string): Promise<TimeSeriesData[]> => {
    const response = await apiClient.get(`/devices/${deviceId}/data`); 
    return response.data;
  };
  
  export const addTimeSeriesData = async (
    deviceId: string,
    data: Omit<TimeSeriesData, 'timestamp'>
  ): Promise<TimeSeriesData> => {
    const response = await apiClient.post(`/devices/${deviceId}/data`, data); 
    return response.data;
  };