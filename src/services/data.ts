import { rawSelect } from '../database/db'
import Datasource from '../models/datasource'

export const getDataFromTdTables = async () => {
  const datasource = await Datasource.findAll({
    raw: true,
  })

  const tasks: Promise<{ value: string }[]>[] = []
  datasource.forEach((dt) => {
    tasks.push(
      rawSelect<{ value: string }[]>(
        `SELECT [value] from ${dt.source} (nolock)`,
      ),
    )
  })

  const result = await Promise.all(tasks)
  const dto: { [key: string]: { value: string }[] } = {}

  datasource.forEach((dt, index) => {
    dto[dt.source] = result[index]
  })

  return dto
}

export const getDataFromDigTable = async (props: {
  table: string
  fields: string[]
  filter: { field: string; value: string }
}) => {
  const { table, fields, filter } = props
  const query = `SELECT ${fields.join()} FROM ${table} (NOLOCK) WHERE ${
    filter.field
  } LIKE '%${filter.value}%'`
  return rawSelect<unknown[]>(query)
}

export const getSettings = () => {
  return {
    dateFieldId: +(process.env.DATE_FIELD_ID || 0),
  }
}

export const getDbValidation = (query: string) =>
  rawSelect<{ COUNT: number }>(query)
