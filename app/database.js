// Pooling
const { Pool } = require('pg');
// Making sure we can switch from local database to Heroku Postgres database depending on environment
const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : null,
  ssl: isProduction ? {
    rejectUnauthorized: false
  } : null
});

console.log(pool);

module.exports = pool;