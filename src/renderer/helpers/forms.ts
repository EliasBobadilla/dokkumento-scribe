import { Language } from 'renderer/helpers/languages'
import { UserDto } from 'dtos/user'
import { SettingsDto } from 'dtos/settings'
import { FieldTypeDto } from '../../dtos/fieldType'
import { ProjectDto } from '../../dtos/project'
import { FormDto } from '../../dtos/form'
import { FormFieldDto } from '../../dtos/formField'
import { FormData, SubmitFormDto } from '../../dtos/general'

const regexValidator = (value: string, type: FieldTypeDto): string | null => {
  if (!type.pattern) return null
  try {
    const regex = new RegExp(type.pattern)
    return regex.test(value) ? null : type.validationMessage
  } catch {
    return type.validationMessage
  }
}

const lenValidator = (
  value: string,
  field: FormFieldDto,
  type: FieldTypeDto,
  language: Language,
): null | string => {
  if (type.code.includes('DATE')) return null

  if (field.maxLength === 0 && field.minLength === 0) return null

  if (value && value.length > field.maxLength)
    return `${language.typist.maxLenError} ${field.maxLength}`

  if (!field.required) return null

  if (value.length < field.minLength)
    return `${language.typist.minLenError} ${field.minLength}`

  return null
}

export const customValidator = (
  value: string,
  field: FormFieldDto,
  type: FieldTypeDto,
  language: Language,
) => {
  const regexHasError = regexValidator(value, type)
  if (regexHasError) return Promise.reject(new Error(regexHasError))

  const lenHasError = lenValidator(value, field, type, language)
  if (lenHasError) return Promise.reject(new Error(lenHasError))

  return Promise.resolve()
}

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
    isValidRequiredAndLen = len >= field.minLength && len <= field.maxLength
  }

  return isValidRegex && isValidRequiredAndLen
}

export const buildSubmitData = (
  project: ProjectDto,
  form: FormDto,
  formFields: FormFieldDto[],
  data: FormData,
  tag: string,
  user: UserDto,
  settings: SettingsDto,
  forced?: boolean,
): SubmitFormDto => {
  const model: SubmitFormDto = {
    table: `DIG_${project.code}_${form.code}`,
    properties: ['CreatedBy', 'Host'],
    values: [user.id.toString(), user.host],
  }
  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      const formField = formFields.find((x) => x.code === key)

      model.properties.push(key)
      if (formField?.fieldTypeId !== settings.dateFieldId)
        model.values.push(formField?.uppercase ? value.toUpperCase() : value)
      else if (value.includes('/') || value.includes('-'))
        model.values.push(value)
      else if (value.length === 6 || value.length === 8)
        model.values.push(
          `${value.substring(0, 2)}-${value.substring(2, 4)}-${value.substring(
            4,
          )}`,
        )
      else model.values.push(value)
    }
  })

  if (tag.length) {
    model.properties.push('tags')
    model.values.push(tag)
  }

  if (forced) {
    model.properties.push('forced')
    model.values.push('1')
  }

  return model
}
