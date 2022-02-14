import { ipcMain } from 'electron'
import sql from './sql'

const poolConnect = sql.connect()

const getUser = async (user, pwd) => {
  const sqlQuery = `select * from Users (nolock) where [Username]='${user}' and [Password]='${pwd}' and [Deleted]=0`
  const request = sql.request()
  const result = await request.query(sqlQuery)
  return result.recordset[0]
}

const getRole = async (roleId) => {
  const sqlQuery = `select * from Roles (nolock) where Id=${roleId}`
  const request = sql.request()
  const result = await request.query(sqlQuery)
  return result.recordset[0]
}

ipcMain.handle('login', async (_, args) => {
  try {
    const { user, pwd } = args
    await poolConnect
    const User = await getUser(user, pwd)
    const Role = await getRole(User.RoleId)

    if (!User || !Role || User.length === 0 || Role.length === 0)
      throw new Error('Error de Autorizacion')

    return { User, Role }
  } catch (error) {
    console.error(error)
    return error
  }
})
