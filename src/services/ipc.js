import { ipcMain } from 'electron'
import sql from 'mssql'
import sqlConfig from '../config/sql'
import { getRole, getUser } from './authorization'
import {
  getFieldTypes,
  getFormFields,
  getForms,
  getProjects,
} from './documents'

const sqlErrorHandler = (error) => {
  console.error(error) // TODO: Implementar logs
  return undefined
}
const pool = new sql.ConnectionPool(sqlConfig)

pool.on('error', (error) => {
  sqlErrorHandler({ origin: 'Sql pool connection', ...error })
})

ipcMain.handle('login', async (_, args) => {
  try {
    const cnn = await pool.connect()
    const User = await getUser(cnn, args)
    if (!User || User.length === 0) throw new Error('Login error')

    const Role = await getRole(cnn, { roleId: User.RoleId })
    if (!Role || Role.length === 0) throw new Error('Role error')

    return { User, Role }
  } catch (error) {
    return sqlErrorHandler({ origin: 'login', ...error })
  }
})

ipcMain.handle('getFieldTypes', async (_) => {
  try {
    const cnn = await pool.connect()
    return await getFieldTypes(cnn)
  } catch (error) {
    return sqlErrorHandler({ origin: 'getFieldTypes', ...error })
  }
})

ipcMain.handle('getProjects', async (_) => {
  try {
    const cnn = await pool.connect()
    return await getProjects(cnn)
  } catch (error) {
    return sqlErrorHandler({ origin: 'getProjects', ...error })
  }
})

ipcMain.handle('getForms', async (_, args) => {
  try {
    const cnn = await pool.connect()
    return await getForms(cnn, args)
  } catch (error) {
    return sqlErrorHandler({ origin: 'getForms', ...error })
  }
})

ipcMain.handle('getFormFields', async (_, args) => {
  try {
    const cnn = await pool.connect()
    return await getFormFields(cnn, args)
  } catch (error) {
    return sqlErrorHandler({ origin: 'getFormFields', ...error })
  }
})
