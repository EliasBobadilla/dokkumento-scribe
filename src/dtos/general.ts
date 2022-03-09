import { ProjectDto } from './project'
import { FormDto } from './form'
import { FormFieldDto } from './formField'

export interface UserRequestDto {
  username: string
  password: string
}

export interface SubmitFormDto {
  table: string
  properties: string[]
  values: string[]
}

export interface FormData {
  [key: string]: string
}

export interface SubmitFormBuilderDto {
  project: ProjectDto
  form: FormDto
  fields: FormFieldDto[]
}
