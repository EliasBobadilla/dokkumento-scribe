import { FieldTypeModel } from '../models/fieldTypes'
import { FormFieldModel, FormModel, SubmitDataModel } from '../models/form'
import { ProjectModel } from '../models/projects'

export const validateFormData = (
  value: string,
  field: FormFieldModel,
  rule?: FieldTypeModel,
): boolean => {
  if (!rule) return true
  let isValidRegex = true
  let isValidRequiredAndLen = true

  if (rule.Pattern) {
    const regex = new RegExp(rule.Pattern)
    isValidRegex = regex.test(value)
  }

  if (field.Required && !rule.Code.includes('DATE')) {
    const len = value.length
    isValidRequiredAndLen = len > field.MinLength && len < field.MaxLength
  }

  return isValidRegex && isValidRequiredAndLen
}

export const buildSubmitData = (
  userId: number,
  project: ProjectModel,
  form: FormModel,
  data: any,
): SubmitDataModel => {
  const model: SubmitDataModel = {
    Table: `DIG_${project.Code}_${form.Code}`,
    Properties: ['CreatedBy'],
    Values: [userId],
  }

  Object.entries(data).forEach(([key, value]) => {
    model.Properties.push(key)
    model.Values.push(value)
  })

  return model
}
