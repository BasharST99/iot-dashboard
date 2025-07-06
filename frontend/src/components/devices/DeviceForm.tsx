import { useForm } from 'react-hook-form';
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  TextField 
} from '@mui/material';
import { useAddDevice } from '../../features/devices/hooks/useDevices';
import { useSnackbar } from 'notistack';
import { Device } from '../../types/device';

interface DeviceFormProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
}

export const DeviceForm = ({ open, onClose }: DeviceFormProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const { mutate: addDevice, isPending: isAdding } = useAddDevice();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data: FormData) => {
    addDevice(data as Omit<Device, "id" | "created_at">, {
      onSuccess: () => {
        enqueueSnackbar('Device added successfully', { variant: 'success' });
        reset();
        onClose();
      },
      onError: (error: Error) => {
        enqueueSnackbar(error.message || 'Failed to add device', { variant: 'error' });
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Device</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
            <TextField
              fullWidth
              label="Device Name"
              variant="outlined"
              {...register('name', { required: 'Device name is required' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={isAdding}
          >
            {isAdding ? 'Adding...' : 'Add Device'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};