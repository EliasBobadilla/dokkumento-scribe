import Project from '../models/project'
import FieldType from '../models/fieldType'
import { sqlSQLExceptionLogger, rawInsert } from '../models/db'
import Form from '../models/form'
import FormField from '../models/formField'

export const getProjects = async (): Promise<Project[]> => {
  try {
    const data = await Project.findAll({
      raw: true,
    })

    if (data.length === 0)
      sqlSQLExceptionLogger(
        new Error(
          `No se encontraron proyectos disponibles en la base de datos`,
        ),
        true,
      )

    return data
  } catch (error) {
    sqlSQLExceptionLogger(error)
    return []
  }
}

export const getFieldTypes = async (): Promise<FieldType[]> => {
  try {
    const data = await FieldType.findAll({
      raw: true,
    })

    if (data.length === 0)
      sqlSQLExceptionLogger(
        new Error(
          `No se encontraron tipos de campo/templates disponibles en la base de datos`,
        ),
        true,
      )

    return data
  } catch (error) {
    sqlSQLExceptionLogger(error)
    return []
  }
}

export const getForms = async (projectId: number): Promise<Form[]> => {
  try {
    const data = await Form.findAll({
      raw: true,
      where: {
        projectId,
      },
    })

    if (data.length === 0)
      sqlSQLExceptionLogger(
        new Error(
          `No se encontraron formularios disponibles en la base de datos`,
        ),
        true,
      )

    return data
  } catch (error) {
    sqlSQLExceptionLogger(error)
    return []
  }
}

export const getFormFields = async (
  projectId: number,
): Promise<FormField[]> => {
  try {
    const data = await FormField.findAll({
      raw: true,
      where: {
        projectId,
      },
    })

    if (data.length === 0)
      sqlSQLExceptionLogger(
        new Error(
          `No se encontraron formularios disponibles en la base de datos`,
        ),
        true,
      )

    return data
  } catch (error) {
    sqlSQLExceptionLogger(error)
    return []
  }
}

export const saveForm = async (model: any) => {
  const { table, properties, values } = model
  const query = `INSERT INTO [${table}] ([${properties
    .join()
    .replaceAll(',', '],[')}]) VALUES ('${values
    .join()
    .replaceAll(',', "','")}')`

  return rawInsert(query)
}

export const upsertProject = async (model: any) => {
  if (!model.id) {
    const inserted = await await Project.create(model)
    return inserted.get({ plain: true })
  }

  const result = await Project.update(model, {
    where: { id: model.id },
  })

  return result.length && result[0] ? model : undefined
}
