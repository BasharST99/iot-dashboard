import app from './app';
import pool from './db';
import devicesRouter from './routes/devices';
import dataRouter from './routes/data';


const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('IoT Dashboard Backend');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/devices', devicesRouter);
app.use('/devices', dataRouter);