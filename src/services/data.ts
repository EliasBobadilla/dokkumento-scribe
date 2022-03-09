import { rawSelect } from '../database/db'
import Datasource from '../models/datasource'

const getDataSource = async () => {
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

export default getDataSource
