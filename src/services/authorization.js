export const getUser = async (sql, props) => {
  const { user, pwd } = props
  const sqlQuery = `select * from [Users] (nolock) where [Username]='${user}' and [Password]='${pwd}' and [Deleted]=0`
  const request = sql.request()
  const result = await request.query(sqlQuery)
  return result.recordset[0]
}

export const getRole = async (sql, props) => {
  const { roleId } = props
  const sqlQuery = `select * from [Roles] (nolock) where [Id]=${roleId}`
  const request = sql.request()
  const result = await request.query(sqlQuery)
  return result.recordset[0]
}
