export const createTables = `
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
`;

export const getDevices = 'SELECT * FROM devices;';
export const addDevice = 'INSERT INTO devices (name) VALUES ($1) RETURNING *;';
export const addData = 'INSERT INTO device_data (device_id, value) VALUES ($1, $2) RETURNING *;';
export const getDeviceData = `
  SELECT * FROM device_data 
  WHERE device_id = $1
  ORDER BY timestamp;
`;
