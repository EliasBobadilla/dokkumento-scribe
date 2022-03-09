export interface FormFieldDto {
  id?: number
  projectId: number
  formId: number
  fieldTypeId: number
  order: number
  code: string
  name: string
  datasource: string
  minLength: number
  maxLength: number
  uppercase: boolean
  required: boolean
}
