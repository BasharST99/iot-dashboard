import { useQuery } from '@tanstack/react-query';
import { fetchDevices } from '../api/devices';
import { fetchTimeSeriesData } from '../api/timeSeries';

export const useDevicesWithData = () => {

  const {
    isLoading: isDevicesLoading,
    error: devicesError,
  } = useQuery({
    queryKey: ['devices'],
    queryFn: fetchDevices,
  });

  const devicesWithData = useQuery({
    queryKey: ['devicesWithData'],
    queryFn: async () => {
      const devices = await fetchDevices();
      const devicesData = await Promise.all(
        devices.map(async (device) => {
          const data = await fetchTimeSeriesData(device.id);
          return { ...device, values: data || [] };
        })
      );
      return devicesData;
    },
  });

  return {
    data: devicesWithData.data,
    isLoading: isDevicesLoading || devicesWithData.isLoading,
    error: devicesError || devicesWithData.error,
    refetch: devicesWithData.refetch,
  };
};