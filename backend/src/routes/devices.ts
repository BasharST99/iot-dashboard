import { Router } from 'express';
import pool from '../db';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM devices;');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query(
      'INSERT INTO devices (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create device' });
  }
});
router.get('/data/all', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM device_data ORDER BY timestamp DESC LIMIT 100');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;