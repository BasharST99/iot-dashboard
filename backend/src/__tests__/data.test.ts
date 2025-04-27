import request from 'supertest';
import app from '../app';
import pool from '../db';

describe('Device Data API', () => {
  let deviceId: number;

  beforeAll(async () => {
    // Clear ALL test data before starting
    await pool.query('TRUNCATE device_data, devices RESTART IDENTITY CASCADE');
    
    // Create test device
    const res = await pool.query(
      'INSERT INTO devices (name) VALUES ($1) RETURNING id',
      ['Test Device']
    );
    deviceId = res.rows[0].id;
  });

  // 🔧 This runs before each test
  beforeEach(async () => {
    await pool.query('TRUNCATE device_data RESTART IDENTITY');
  });

  afterAll(async () => {
    await pool.end();
  });

  test('POST /api/devices/:id/data - Add data point', async () => {
    const res = await request(app)
      .post(`/api/devices/${deviceId}/data`)
      .send({ value: 25.5 });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  test('GET /api/devices/:id/data - Get device data', async () => {
    // First add exactly ONE test data point
    await pool.query(
      'INSERT INTO device_data (device_id, value) VALUES ($1, $2)',
      [deviceId, 25.5]
    );
    
    const res = await request(app).get(`/api/devices/${deviceId}/data`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1); // Now guaranteed to be 1
    expect(res.body[0].value).toBe(25.5);
  });
});