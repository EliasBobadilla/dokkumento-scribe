import Project from '../models/project'
import FieldType from '../models/fieldType'
import { rawInsert } from '../models/db'
import Form from '../models/form'
import FormField from '../models/formField'

const buildCode = (code: string) => {
  const value = code
    .replaceAll(' ', '')
    .replaceAll('-', '')
    .replaceAll('.', '')
    .replaceAll('á', 'a')
    .replaceAll('é', 'e')
    .replaceAll('í', 'i')
    .replaceAll('ó', 'o')
    .replaceAll('ú', 'u')
    .replaceAll('*', '')

  return value.toUpperCase()
}

const buildTable = (project: string, form: string) => `DIG_${project}_${form}`

export const getProjects = async () =>
  Project.findAll({
    raw: true,
    where: {
      deleted: false,
    },
  })

export const getFieldTypes = async () =>
  FieldType.findAll({
    raw: true,
    where: {
      deleted: false,
    },
  })

export const getForms = async () =>
  Form.findAll({
    raw: true,
    where: {
      deleted: false,
    },
  })

export const getFormFields = async () =>
  FormField.findAll({
    raw: true,
    where: {
      deleted: false,
    },
  })

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
  const code = buildCode(model.code)
  if (!model.id) {
    const inserted = await Project.create({
      ...model,
      code,
    })
    return inserted.get({ plain: true })
  }

  const result = await Project.update(
    { ...model, code },
    {
      where: { id: model.id },
    },
  )

  return result.length && result[0] ? model : undefined
}

export const deleteProject = async (id: number) => {
  const result = await Project.update(
    { deleted: true },
    {
      where: { id },
    },
  )

  if (result.length) {
    await Form.update(
      { deleted: true },
      {
        where: { projectId: id },
      },
    )
    await FormField.update(
      { deleted: true },
      {
        where: { projectId: id },
      },
    )
  }

  return result.length && result[0]
}

export const upsertForm = async (model: any) => {
  const code = buildCode(model.code)
  if (!model.id) {
    const inserted = await Form.create({
      ...model,
      code,
    })

    const project = await Project.findAll({
      limit: 1,
      raw: true,
      where: {
        id: model.projectId,
      },
    })

    const table = buildTable(project[0].code, code)
    const query = `CREATE TABLE ${table} ([Id] INTEGER IDENTITY(1,1) PRIMARY KEY, [CreatedBy] INTEGER, [Tags] VARCHAR(500) null, [CreatedOn] DATETIME DEFAULT GETDATE(), FOREIGN KEY (CreatedBy) REFERENCES [Users](Id))`
    await rawInsert(query)
    return inserted.get({ plain: true })
  }

  const result = await Form.update(
    { ...model, code },
    {
      where: { id: model.id },
    },
  )

  return result.length && result[0] ? model : undefined
}

export const deleteForm = async (id: number) => {
  const result = await Form.update(
    { deleted: true },
    {
      where: { id },
    },
  )

  if (result.length) {
    await FormField.update(
      { deleted: true },
      {
        where: { projectId: id },
      },
    )
  }

  return result.length && result[0]
}

export const upsertFormFields = async (model: any[]) => {
  const project = await Project.findAll({
    limit: 1,
    raw: true,
    where: {
      id: model[0].projectId,
    },
  })

  const form = await Form.findAll({
    limit: 1,
    raw: true,
    where: {
      id: model[0].formId,
    },
  })

  const table = buildTable(project[0].code, form[0].code)

  const tasks: any[] = []

  model.forEach(async (element) => {
    const code = buildCode(element.code)
    try {
      if (!element.id) {
        const query = `ALTER TABLE ${table} ADD [${code}] VARCHAR(500) NULL`
        tasks.push(rawInsert(query))
        tasks.push(
          FormField.create({
            ...element,
            code,
          }),
        )
      } else {
        tasks.push(
          FormField.update(
            { ...element, code },
            {
              where: { id: element.id },
            },
          ),
        )
      }
    } catch (error) {
      console.log(`+++ Field Error: ${code} ==>`, error)
    }
  })

  await Promise.all(tasks)
  return FormField.findAll({
    raw: true,
    where: {
      projectId: model[0].projectId,
      formId: model[0].formId,
    },
  })
}
