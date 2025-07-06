import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { darkTheme } from './styles/theme';
import { Home } from './pages/Home';
import { DeviceDetail } from './pages/DeviceDetail';
import { AppQueryClientProvider } from './providers/QueryClientProvider';
import { AppBar } from './components/AppBar';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <AppQueryClientProvider>
          <AppBar />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/devices/:deviceId" element={<DeviceDetail />} />
            </Routes>
          </BrowserRouter>
        </AppQueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;