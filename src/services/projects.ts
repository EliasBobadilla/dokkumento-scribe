import Project from '../models/project'
import Form from '../models/form'
import FormField from '../models/formField'
import { buildCode } from './helpers'

export const getProjects = async () =>
  Project.findAll({
    raw: true,
    where: {
      deleted: false,
    },
  })

export const upsertProject = async (model: Project) => {
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
