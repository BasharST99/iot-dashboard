import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/',
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
      return Promise.reject({
        message: error.response.data?.message || 'An error occurred',
        status: error.response.status,
      });
    } else if (error.request) {
      console.error('API Error: No response received');
      return Promise.reject({ message: 'No response from server' });
    } else {
      console.error('API Error:', error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

export default apiClient;