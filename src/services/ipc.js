import { ipcMain } from 'electron'
import sql from './sql'
import { getRole, getUser } from './authorization'
import {
  getFieldTypes,
  getFormFields,
  getForms,
  getProjects,
} from './documents'

const sqlErrorHandler = (error) => {
  console.error('=================================================')
  console.error(error)
  console.error('=================================================')
  return undefined
}

ipcMain.handle('login', async (_, args) => {
  try {
    await sql.connect()

    const User = await getUser(sql, args)
    if (!User || User.length === 0) throw new Error('Login error')

    const Role = await getRole(sql, { roleId: User.RoleId })
    if (!Role || Role.length === 0) throw new Error('Role error')

    return { User, Role }
  } catch (error) {
    return sqlErrorHandler({ from: 'login', ...error })
  }
})

ipcMain.handle('getFieldTypes', async (_) => {
  try {
    await sql.connect()
    return await getFieldTypes(sql)
  } catch (error) {
    return sqlErrorHandler({ from: 'getFieldTypes', ...error })
  }
})

ipcMain.handle('getProjects', async (_) => {
  try {
    await sql.connect()
    return await getProjects(sql)
  } catch (error) {
    return sqlErrorHandler({ from: 'getProjects', ...error })
  }
})

ipcMain.handle('getForms', async (_, args) => {
  try {
    await sql.connect()
    return await getForms(sql, args)
  } catch (error) {
    return sqlErrorHandler({ from: 'getForms', ...error })
  }
})

ipcMain.handle('getFormFields', async (_, args) => {
  try {
    await sql.connect()
    return await getFormFields(sql, args)
  } catch (error) {
    return sqlErrorHandler({ from: 'getFormFields', ...error })
  }
})
