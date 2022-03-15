import Project from '../models/project'
import { rawInsert } from '../database/db'
import Form from '../models/form'
import FormField from '../models/formField'
import { buildCode, buildTable } from './helpers'

export const getForms = async () =>
  Form.findAll({
    raw: true,
    where: {
      deleted: false,
    },
  })

export const upsertForm = async (model: Form) => {
  const code = buildCode(model.code)

  if (!model.id) {
    const project = await Project.findAll({
      limit: 1,
      raw: true,
      where: {
        id: model.projectId,
      },
    })

    const table = buildTable(project[0].code, code)

    const insertedForm = await Form.create({
      ...model,
      code,
      digTable: table,
    })

    const query = `CREATE TABLE ${table} ([Id] INTEGER IDENTITY(1,1) PRIMARY KEY, [CreatedBy] INTEGER, [Tags] VARCHAR(500) NULL, [Host] VARCHAR(100) NOT NULL, [Forced] BIT DEFAULT 0, [CreatedOn] DATETIME DEFAULT GETDATE(), FOREIGN KEY (CreatedBy) REFERENCES [Users](Id))`
    await rawInsert(query)

    return insertedForm.get({ plain: true })
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
  if (!result.length) return false

  await FormField.update(
    { deleted: true },
    {
      where: { projectId: id },
    },
  )

  const form = await Form.findAll({
    limit: 1,
    raw: true,
    where: {
      id,
    },
  })

  const project = await Project.findAll({
    limit: 1,
    raw: true,
    where: {
      id: form[0].projectId,
    },
  })

  const table = buildTable(project[0].code, form[0].code)
  const query = `sp_rename '${table}' ,'${table}_DELETED_${id}'`

  return rawInsert(query)
}

export const saveFormValues = async (props: {
  table: string
  properties: string[]
  values: string[]
}) => {
  const { table, properties, values } = props
  const query = `INSERT INTO [${table}] ([${properties
    .join()
    .replaceAll(',', '],[')}]) VALUES ('${values
    .join()
    .replaceAll(',', "','")}')`

  return rawInsert(query)
}
