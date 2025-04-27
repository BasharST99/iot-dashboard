import { Router } from 'express';
import pool from '../db';

const router = Router();

router.post('/:id/data', async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    const result = await pool.query(
      'INSERT INTO device_data (device_id, value) VALUES ($1, $2) RETURNING *;',
      [id, value]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/:id/data', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM device_data WHERE device_id = $1 ORDER BY timestamp;',
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;