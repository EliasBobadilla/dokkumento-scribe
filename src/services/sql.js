import sql from 'mssql'

export const sqlConfig = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  server: process.env.DB_SERVER,
  port: +process.env.DB_PORT,
  connectionTimeout: 30000,
  requestTimeout: 30000,
  pool: {
    max: 30000,
    min: 1,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
}

const pool = new sql.ConnectionPool(sqlConfig)

pool.on('error', (err) => {
  console.error('sql pool error =>', err)
})

export default pool
