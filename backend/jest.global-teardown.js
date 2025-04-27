const { pool } = require('../src/db');

module.exports = async () => {
  await pool.end();
};