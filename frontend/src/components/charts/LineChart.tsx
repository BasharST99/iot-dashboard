import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTheme } from '@mui/material/styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


interface LineChartData {
  timestamp: string | number | Date;
  value: number;
  device_id: string;
}

interface LineChartProps {
  data: LineChartData[];
  title?: string;
}

export const LineChart = ({ data, title }: LineChartProps) => {
  const theme = useTheme();
  const deviceId = data[0]?.device_id;

  const chartData = {
    labels: data.map((item: { timestamp: string | number | Date; }) => new Date(item.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: `Device ${deviceId} Values`,
        data: data.map((item: { value: any; }) => item.value),
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: theme.palette.text.primary,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme.palette.text.secondary,
        },
        grid: {
          color: theme.palette.divider,
        },
      },
      y: {
        ticks: {
          color: theme.palette.text.secondary,
        },
        grid: {
          color: theme.palette.divider,
        },
      },
    },
  };

  return <Line options={options} data={chartData} />;
};