import cors from 'cors';
import express from 'express';
import deviceRoutes from './routes/devices';
import dataRoutes from './routes/data';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './swaggerOptions';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Swagger setup
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/devices', deviceRoutes);
app.use('/api/devices', dataRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app;
