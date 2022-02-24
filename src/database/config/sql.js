export default {
  user: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DBNAME || '',
  server: process.env.DB_SERVER || '',
  port: +process.env.DB_PORT || 0,
  connectionTimeout: 3000,
  requestTimeout: 3000,
  pool: {
    max: 3000,
    min: 1,
    idleTimeoutMillis: 3000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  encrypt: true,
}
