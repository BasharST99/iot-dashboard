import request from 'supertest';
import app from '../app';
import pool from '../db';

describe('Device API', () => {
    beforeAll(async () => {
        // Clear existing tables
        await pool.query('DROP TABLE IF EXISTS device_data');
        await pool.query('DROP TABLE IF EXISTS devices');
        
        // Create fresh tables
        await pool.query(`
          CREATE TABLE devices (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )`
        );
        
        await pool.query(`
          CREATE TABLE device_data (
            id SERIAL PRIMARY KEY,
            device_id INTEGER REFERENCES devices(id),
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            value FLOAT NOT NULL
          )`
        );
      }, 10000);

  afterAll(async () => {
    await pool.end();
  });

  test('POST /api/devices - Create new device', async () => {
    const res = await request(app)
      .post('/api/devices')
      .send({ name: 'Test Device' });
      
    expect(res.statusCode).toBe(201); // Changed from 201 to 200
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Device');
  });

  test('GET /api/devices - List all devices', async () => {
    const res = await request(app).get('/api/devices');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty('id');
  });
});