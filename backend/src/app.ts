import cors from 'cors';

import express from 'express';
import deviceRoutes from './routes/devices';
import dataRoutes from './routes/data';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

app.use('/api/devices', deviceRoutes); 
app.use('/api/devices', dataRoutes); 
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});


export default app;