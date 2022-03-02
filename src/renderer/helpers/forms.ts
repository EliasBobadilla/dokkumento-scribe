import {
  FieldTypeDto,
  FormFieldDto,
  FormDto,
  SubmitFormDto,
  ProjectDto,
  FormData,
} from '../dtos/documents'

export const validateFormData = (
  value: string,
  field: FormFieldDto,
  rule?: FieldTypeDto,
): boolean => {
  if (!rule) return true
  let isValidRegex = true
  let isValidRequiredAndLen = true

  if (rule.pattern) {
    const regex = new RegExp(rule.pattern)
    isValidRegex = regex.test(value)
  }

  if (field.required && !rule.code.includes('DATE')) {
    const len = value.length
    isValidRequiredAndLen = len > field.minLength && len < field.maxLength
  }

  return isValidRegex && isValidRequiredAndLen
}

export const buildSubmitData = (
  project: ProjectDto,
  form: FormDto,
  formFields: FormFieldDto[],
  data: FormData,
  tags: string[],
  userId: number,
  forced?: boolean,
): SubmitFormDto => {
  const model: SubmitFormDto = {
    table: `DIG_${project.code}_${form.code}`,
    properties: ['CreatedBy'],
    values: [userId.toString()],
  }
  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      const formField = formFields.find((x) => x.code === key)
      model.properties.push(key)
      model.values.push(formField?.uppercase ? value.toUpperCase() : value)
    }
  })

  if (tags.length) {
    model.properties.push('Tags')
    model.values.push(tags[0])
  }

  if (forced) {
    model.properties.push('FORCED')
    model.values.push('1')
  }

  return model
}
