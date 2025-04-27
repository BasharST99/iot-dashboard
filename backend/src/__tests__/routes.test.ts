import request from 'supertest';
import app from '../app';

describe('Route Verification', () => {
  test('GET /api/health - Should return 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
  });
});