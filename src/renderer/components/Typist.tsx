/* eslint-disable react-hooks/exhaustive-deps */
import { Button, TextInputField, toaster } from 'evergreen-ui'
import { useEffect, useState } from 'react'
import { useAppContext } from '../context'
import { FormFieldModel, FormModel, SubmitDataModel } from '../models/form'
import { ProjectModel } from '../models/projects'
import { FieldTypeModel } from '../models/fieldTypes'
import { buildSubmitData, validateFormData } from '../helpers/formDataHandler'

interface Props {
  projectId: number
  formId: number
}

const Typist = ({ projectId, formId }: Props) => {
  const { userContext, formContext, fieldTypeContext, projectContext } =
    useAppContext()
  const [project, setProject] = useState<ProjectModel>()
  const [form, setForm] = useState<FormModel>()
  const [data, setData] = useState<any>({})
  const [isInvalidValid, setIsInvalidValid] = useState<any>({})

  useEffect(() => {
    setProject(projectContext.find((x) => x.Id === projectId))
    setForm(formContext.Forms.find((x) => x.Id === formId))
  }, [projectId, formId])

  const submit = async (model: SubmitDataModel) => {
    const response = await window.electron.ipc.invoke<FieldTypeModel[]>(
      'submitForm',
      model,
    )
    console.log('=>', model)
    if (!response) {
      toaster.danger('Error al guardar los datos, intente nuevamente')
    }
  }

  const handleSubmit = async () => {
    const formIsValid = Object.entries(isInvalidValid).every(
      ([_, value]) => value === false,
    )
    if (!formIsValid) {
      toaster.danger('El formulario contiene datos invalidos!')
      return
    }

    const submitModel = buildSubmitData(userContext.Id, project!, form!, data)
    await submit(submitModel)
  }

  const handleForceSubmit = async () => {
    const submitModel = buildSubmitData(userContext.Id, project!, form!, data)
    await submit(submitModel)
  }

  const handleData = (
    code: string,
    value: any,
    field: FormFieldModel,
    rule?: FieldTypeModel,
  ) => {
    setData({ ...data, [code]: value })
    const invalid = !validateFormData(value, field, rule)
    setIsInvalidValid({ ...isInvalidValid, [code]: invalid })
  }

  return (
    <>
      <div>
        {formContext.FormFields.map((field: FormFieldModel) => {
          const fieldType = fieldTypeContext.find(
            (t) => t.Id === field.FieldTypeId,
          )
          return (
            <TextInputField
              style={{ fontSize: '20px' }}
              inputHeight={48}
              key={field.Code}
              name={field.Code}
              label={field.Name}
              required={field.Required}
              hint={field?.Description}
              onChange={(e: any) =>
                handleData(field.Code, e.target.value, field, fieldType)
              }
              validationMessage={
                isInvalidValid[field.Code]
                  ? fieldType?.ValidationMessage
                  : undefined
              }
            />
          )
        })}
      </div>
      <Button
        onClick={handleSubmit}
        height={48}
        appearance='primary'
        intent='success'
      >
        Guardar
      </Button>
      <Button
        onClick={handleForceSubmit}
        height={48}
        appearance='primary'
        intent='danger'
      >
        Forzar campo
      </Button>
    </>
  )
}

export default Typist
