export const getFieldTypes = async (sql) => {
  const sqlQuery = 'SELECT * FROM [FieldTypes] (NOLOCK) WHERE [Deleted]=0'
  const result = await sql.request().query(sqlQuery)
  return result.recordset
}

export const getProjects = async (sql) => {
  const sqlQuery = 'SELECT * FROM [Projects] (NOLOCK) WHERE [Deleted]=0'
  const result = await sql.request().query(sqlQuery)
  return result.recordset
}

export const getForms = async (sql, props) => {
  const { projectId } = props
  const sqlQuery = `SELECT * FROM [Forms] (NOLOCK) WHERE [ProjectId]=${projectId} AND [Deleted]=0`
  const result = await sql.request().query(sqlQuery)
  return result.recordset
}

export const getFormFields = async (sql, props) => {
  const { projectId } = props
  const sqlQuery = `SELECT * FROM [FormFields] (NOLOCK) WHERE [ProjectId]=${projectId} AND [Deleted]=0`
  const result = await sql.request().query(sqlQuery)
  return result.recordset
}

export const saveForm = async (sql, props) => {
  const { Table, Properties, Values } = props
  const sqlQuery = `INSERT INTO [${Table}] ([${Properties.join().replaceAll(
    ',',
    '],[',
  )}]) VALUES ('${Values.join().replaceAll(',', "','")}')`
  const result = await sql.request().query(sqlQuery)
  console.log('===>', result)
  return true
}
