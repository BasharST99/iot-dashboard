import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAddTimeSeriesData } from '../../features/devices/hooks/useTimeSeries';

interface ValueFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  deviceId: string | null;
}

interface FormData {
  value: number;
}

export const ValueForm = ({ open, onClose, onSubmit, deviceId }: ValueFormProps) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { mutate: addValue, isPending } = useAddTimeSeriesData();
    const isLoading = isPending;
  const handleFormSubmit = (data: FormData) => {
    if (!deviceId) return;
    
    addValue({ deviceId, value: data.value }, {
      onSuccess: () => {
        onSubmit();
        reset();
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Value</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Value"
            type="number"
            fullWidth
            variant="standard"
            {...register('value', { required: true })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Value'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};