import { Sequelize, QueryTypes } from 'sequelize'
import sqlConfig from '../config/sql'

export const db = () =>
  new Sequelize(sqlConfig.database, sqlConfig.user, sqlConfig.password, {
    dialect: 'mssql',
    port: sqlConfig.port,
    dialectOptions: {
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
  })

export const rawInsert = async (query: string) => {
  const inserted = await db().query(query, { type: QueryTypes.INSERT })
  return Array.isArray(inserted) && inserted.length > 0
}

export const sqlSQLExceptionLogger = (error: any, isBusiness?: boolean) => {
  error.businessError = isBusiness

  const query = `INSERT INTO [Logs] ([Stack],[Business]) VALUES ('${
    error.stack
  }','${isBusiness ? 1 : 0}')`

  rawInsert(query)
    .then(() => console.log('Log saved'))
    .catch((er) => console.log(er))

  return undefined
}
