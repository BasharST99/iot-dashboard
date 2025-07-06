import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchDevices, addDevice, deleteDevice } from '../api/devices';
import { Device } from '../types/device';

export const useDevices = () => {
  return useQuery<Device[], Error>({
    queryKey: ['devices'],
    queryFn: fetchDevices,
  });
};

export const useAddDevice = () => {
  const queryClient = useQueryClient();
  return useMutation<Device, Error, Omit<Device, 'id' | 'created_at'>>({
    mutationFn: addDevice,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['devices'] });
    },
  });
};

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteDevice,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['devices'] });
    },
  });
};