// server/database.js
const pkg = require('pg');
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "likeme",
  password: "1234",
  port: 5432,
});

module.exports = pool;

