import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDevices, addDevice, deleteDevice } from '../../../api/devices';

export const useDevices = () => {
  return useQuery({
    queryKey: ['devices'],
    queryFn: fetchDevices,
  });
};

export const useAddDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addDevice,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['devices'] });
      queryClient.refetchQueries({ queryKey: ['devicesWithData'] });
    },
  });
};

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDevice,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['devices'] });
    },
  });
};