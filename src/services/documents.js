import sqld from 'mssql'
import { sqlConfig } from './sql'

export const getFieldTypes = async (sql) => {
  const sqlQuery = 'select * from [FieldTypes] (nolock) where [Deleted]=0'
  const request = sql.request()
  const result = await request.query(sqlQuery)
  return result.recordset
}

export const getProjects = async (sql) => {
  const sqlQuery = 'select * from [Projects] (nolock) where [Deleted]=0'
  const request = sql.request()
  const result = await request.query(sqlQuery)
  return result.recordset
}

export const getForms = async (sql, props) => {
  const { projectId } = props
  const sqlQuery = `select * from [Forms] (nolock) where [ProjectId]=${projectId} and [Deleted]=0`
  const request = sql.request()
  const result = await request.query(sqlQuery)
  return result.recordset
}

export const getFormFields = async (sql, props) => {
  const { projectId } = props
  const sqlQuery = `select * from [FormFields] (nolock) where [ProjectId]=${projectId} and [Deleted]=0`
  const request = sql.request()
  const result = await request.query(sqlQuery)
  return result.recordset
}
