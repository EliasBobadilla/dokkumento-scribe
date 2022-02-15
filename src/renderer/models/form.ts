export type FormModel = {
  Id: number
  ProjectId: number
  Name: string
  Description: string
}

export type FormFieldModel = {
  Id: number
  ProjectId: number
  FormId: number
  FieldTypeId: number
  Name: string
  Description: string
  Length: number
}

export interface CurrentFormModel {
  Forms: FormModel[]
  FormFields: FormFieldModel[]
}
