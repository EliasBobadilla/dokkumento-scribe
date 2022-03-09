import Project from '../models/project'
import FieldType from '../models/fieldType'
import { rawInsert } from '../database/db'
import Form from '../models/form'
import FormField from '../models/formField'
import { buildCode, buildTable, ErrorHandler } from './helpers'

export const getFieldTypes = async () =>
  FieldType.findAll({
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
    order: [
      ['projectId', 'DESC'],
      ['formId', 'DESC'],
      ['order', 'DESC'],
    ],
  })

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

  // eslint-disable-next-line no-restricted-syntax
  for (const element of model) {
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
      ErrorHandler(error)
    }
  }

  await Promise.all(tasks)
  return FormField.findAll({
    raw: true,
    where: {
      projectId: model[0].projectId,
      formId: model[0].formId,
    },
  })
}
