const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: process.env.DB_HOST || '0.0.0.0', //for docker-compose deployment
  database: 'postgres',
  password: 'er3T*wnw2',
  port: 5432,
})

function validate_response(response) {
  // validate database response and return rows
  let rows = [];
  if ('rows' in response && response.rows) {
    rows = response.rows;
  }
  return rows;
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  validate_response,
}