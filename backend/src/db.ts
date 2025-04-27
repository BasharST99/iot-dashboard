import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const isTest = process.env.NODE_ENV === 'test';

const config = {
  user: process.env.DB_USER || 'iotuser',
  host: isTest ? 'localhost' : process.env.DB_HOST || 'postgres',
  database: isTest ? 'iotdb_test' : process.env.DB_NAME || 'iotdb',
  password: process.env.DB_PASSWORD || 'iotpassword',
  port: parseInt(process.env.DB_PORT || '5432'),
};

const pool = new Pool(config);

if (!isTest) {
  (async () => {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS devices (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS device_data (
          id SERIAL PRIMARY KEY,
          device_id INTEGER REFERENCES devices(id),
          timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          value FLOAT NOT NULL
        );
      `);
      console.log('Tables created');
    } catch (err) {
      console.error('Database initialization error:', err);
    }
  })();
}

export default pool;