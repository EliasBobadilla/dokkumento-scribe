export type FormModel = {
  Id: number
  ProjectId: number
  Code: string
  Name: string
  Description: string
}

export type FormFieldModel = {
  Id: number
  ProjectId: number
  FormId: number
  FieldTypeId: number
  Code: string
  Name: string
  Description: string
  MinLength: number
  MaxLength: number
  Required: boolean
}

export type SubmitDataModel = {
  Table: string
  Properties: string[]
  Values: unknown[]
}

export type CurrentFormModel = {
  Forms: FormModel[]
  FormFields: FormFieldModel[]
}
