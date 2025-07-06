import { useQuery ,useMutation,  useQueryClient } from '@tanstack/react-query';
import { fetchTimeSeriesData } from '../../../api/timeSeries';
import apiClient from '../../../api/client';

export const useTimeSeriesData = (deviceId: string) => {
  
  return useQuery({
    queryKey: ['timeSeries', deviceId],
    queryFn: () => fetchTimeSeriesData(deviceId),
    enabled: !!deviceId,
  });
};

export const useAddTimeSeriesData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ deviceId, value }: { deviceId: string; value: number }) => {
      return apiClient.post(`/devices/${deviceId}/data`, { value });
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['devicesWithData'] });
    }
  });
};