import sql from 'mssql'

const sqlConfig = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  server: process.env.DB_SERVER,
  port: +process.env.DB_PORT,
  connectionTimeout: 300000,
  requestTimeout: 300000,
  pool: {
    max: 10000,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
}

const pool = new sql.ConnectionPool(sqlConfig)

pool.on('error', (err) => {
  console.error(err)
})

module.exports = pool
