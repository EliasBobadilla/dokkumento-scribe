export interface FieldTypeDto {
  id: number
  code: string
  name: string
  validationMessage: string
  pattern: string
}

export interface FormDto {
  id: number
  projectId: number
  code: string
  name: string
  description: string
}

export interface FormFieldDto {
  id: number
  projectId: number
  formId: number
  fieldTypeId: number
  code: string
  name: string
  description: string
  minLength: number
  maxLength: number
  uppercase: boolean
  required: boolean
}

export interface ProjectDto {
  id: number
  code: string
  name: string
}

export interface SubmitFormDto {
  table: string
  properties: string[]
  values: string[]
}

export interface FormData {
  [key: string]: string
}
