import { QueryTypes, Sequelize } from 'sequelize'

export const db = () =>
  new Sequelize(
    process.env.DB_DBNAME || '',
    process.env.DB_USERNAME || '',
    process.env.DB_PASSWORD || '',
    {
      dialect: 'mssql',
      host: process.env.DB_SERVER,
      port: +(process.env.DB_PORT || 0),
      dialectOptions: {
        instanceName: process.env.DB_INSTANCE,
        connectionTimeout: 3000,
        requestTimeout: 3000,
        pool: {
          idleTimeoutMillis: 3000,
        },
        options: {
          encrypt: true,
          integratedSecurity: true,
          trustServerCertificate: true,
        },
      },
    },
  )

export const rawInsert = async (query: string) => {
  const inserted = await db().query(query, { type: QueryTypes.INSERT })
  return Array.isArray(inserted) && inserted.length > 0
}

export const rawSelect = async <T>(query: string) => {
  const rows = await db().query(query, { type: QueryTypes.SELECT })
  return rows as unknown as T
}
