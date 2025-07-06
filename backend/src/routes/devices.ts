import { Router } from 'express';
import pool from '../db';

const router = Router();

/**
 * @swagger
 * /devices:
 *   get:
 *     summary: Get all devices
 *     responses:
 *       200:
 *         description: A list of devices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM devices;');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /devices:
 *   post:
 *     summary: Create a new device
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Device created
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /devices/data/all:
 *   get:
 *     summary: Get latest 100 device data entries
 *     responses:
 *       200:
 *         description: A list of device data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
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
