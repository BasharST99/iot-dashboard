import { useParams } from 'react-router-dom';
import { useTimeSeriesData } from '../features/devices/hooks/useTimeSeries';
import { BarChart } from '../components/charts/BarChart';
import { LineChart } from '../components/charts/LineChart';
import { 
  Box, 
  CircularProgress, 
  Typography, 
  Paper,
  Chip,
  Divider,
  useTheme 
} from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

export const DeviceDetail = () => {
  const theme = useTheme();
  const { deviceId } = useParams();
  const { data, isLoading, error } = useTimeSeriesData(deviceId || '');

  if (isLoading) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box p={3}>
      <Typography color="error" variant="h6">
        Error loading device data: {error.message}
      </Typography>
    </Box>
  );

  if (!data?.length) return (
    <Box p={3}>
      <Typography variant="h6">
        No data available for this device
      </Typography>
    </Box>
  );

  const latestValue = data[data.length - 1].value;
  const averageValue = (data.reduce((sum, item) => sum + item.value, 0) / data.length).toFixed(2);
  const minValue = Math.min(...data.map(item => item.value));
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h4" component="h1">
          Device Details
        </Typography>
        <Chip 
          label={`ID: ${deviceId}`}
          color="primary"
          variant="outlined"
          icon={<InfoIcon fontSize="small" />}
        />
      </Box>

      <Box sx={{ 
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        mb: 4
      }}>
        <Paper sx={{ 
          p: 2, 
          flex: 1, 
          minWidth: 200,
          borderRadius: 2
        }}>
          <Typography variant="subtitle2" color="textSecondary">
            Latest Value
          </Typography>
          <Typography variant="h4">
            {latestValue}
          </Typography>
        </Paper>

        <Paper sx={{ 
          p: 2, 
          flex: 1, 
          minWidth: 200,
          borderRadius: 2
        }}>
          <Typography variant="subtitle2" color="textSecondary">
            Average Value
          </Typography>
          <Typography variant="h4">
            {averageValue}
          </Typography>
        </Paper>

        <Paper sx={{ 
          p: 2, 
          flex: 1, 
          minWidth: 200,
          borderRadius: 2
        }}>
          <Typography variant="subtitle2" color="textSecondary">
            Value Range
          </Typography>
          <Typography variant="h4">
            {minValue} - {maxValue}
          </Typography>
        </Paper>

        <Paper sx={{ 
          p: 2, 
          flex: 1, 
          minWidth: 200,
          borderRadius: 2
        }}>
          <Typography variant="subtitle2" color="textSecondary">
            Data Points
          </Typography>
          <Typography variant="h4">
            {data.length}
          </Typography>
        </Paper>
      </Box>

      <Paper sx={{ 
        p: 3, 
        mb: 4,
        borderRadius: 2
      }}>
        <Typography variant="h6" gutterBottom>
          Data Overview
        </Typography>
        <Box sx={{ height: 300 }}>
          <BarChart data={data} />
        </Box>
      </Paper>

      <Divider sx={{ my: 3 }} />

      <Paper sx={{ 
        p: 3,
        borderRadius: 2
      }}>
        <Typography variant="h6" gutterBottom>
          Detailed Time Series
        </Typography>
        <Box sx={{ height: 400 }}>
          <LineChart data={data} />
        </Box>
      </Paper>
    </Box>
  );
};