import { Box, Paper, Typography, Chip, CircularProgress, Button } from '@mui/material';
import { DeviceDataGrid } from '../components/devices/DataGrid';
import { BarChart } from '../components/charts/BarChart';
import { LineChart } from '../components/charts/LineChart';
import { useTheme } from '@mui/material/styles';
import { DeviceForm } from '../components/devices/DeviceForm';
import { useState } from 'react';
import { useDevicesWithData } from '../hooks/useDeviceWithData';
import { ValueForm } from '../components/devices/ValueForm';

export const Home = () => {
  const theme = useTheme();
  const { data: devices, isLoading, refetch } = useDevicesWithData();
  const [formOpen, setFormOpen] = useState(false);
  const [valueFormOpen, setValueFormOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

  const handleAddValue = (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    setValueFormOpen(true);
    refetch();
  };

  const handleValueAdded = () => {
    setValueFormOpen(false);
    refetch();
  };

  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <CircularProgress />
    </Box>
  );

  if (!devices?.length) return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">
        No devices available
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setFormOpen(true)}
        sx={{ mt: 2 }}
      >
        Add New Device
      </Button>
      <DeviceForm open={formOpen} onClose={() => setFormOpen(false)} />
    </Box>
  );

  return (
    <Box sx={{
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      backgroundColor: theme.palette.background.default
    }}>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3
      }}>
        <Paper sx={{
          p: 2,
          flex: 1,
          minWidth: 200,
          borderRadius: 2
        }}>
          <Typography variant="subtitle1" color="textSecondary">
            Total Devices
          </Typography>
          <Typography variant="h4">
            {devices.length}
          </Typography>
        </Paper>

        <Paper sx={{
          p: 2,
          flex: 1,
          minWidth: 200,
          borderRadius: 2
        }}>
          <Typography variant="subtitle1" color="textSecondary">
            Active Devices
          </Typography>
          <Typography variant="h4">
            {devices.filter(d => d.values.length > 0).length}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3
      }}>
        {devices.map(device => (
          device.values.length > 0 && (
            <Paper
              key={device.id}
              sx={{
                p: 3,
                flex: 1,
                minWidth: 400,
                height: 400,
                borderRadius: 2
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ mr: 1 }}>
                  {device.name}
                </Typography>
                <Chip
                  label={`ID: ${device.id}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>
              <LineChart data={device.values} />
            </Paper>
          )
        ))}
      </Box>

      <Paper sx={{
        p: 5,
        maxHeight: 400,
        borderRadius: 2
      }}>
        <Typography variant="h6" gutterBottom>
          All Devices Combined Data
        </Typography>
        <BarChart
          data={devices.flatMap(device => device.values)}
        />
      </Paper>

      <Paper sx={{
        p: 3,
        borderRadius: 2
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
          <Typography variant="h5" component="h1">
            Device List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setFormOpen(true)}
          >
            Add New Device
          </Button>
        </Box>
        <DeviceDataGrid
          devices={devices}
          isLoading={false}
          onDelete={(id) => console.log('Delete', id)}
          onAddValue={handleAddValue}
        />
      </Paper>
      
      <DeviceForm open={formOpen} onClose={() => setFormOpen(false)} />
      <ValueForm 
        open={valueFormOpen} 
        onClose={() => setValueFormOpen(false)}
        onSubmit={handleValueAdded}
        deviceId={selectedDeviceId}
      />
    </Box>
  );
};