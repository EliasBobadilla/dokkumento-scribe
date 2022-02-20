/* eslint-disable react-hooks/exhaustive-deps */
import { Button, TextInputField, toaster } from 'evergreen-ui'
import { useEffect, useState, useRef } from 'react'
import styled from '@emotion/styled'
import { useAppContext } from '../context'
import { FormFieldModel, FormModel, SubmitDataModel } from '../models/form'
import { ProjectModel } from '../models/projects'
import { FieldTypeModel } from '../models/fieldTypes'
import { buildSubmitData, validateFormData } from '../helpers/formDataHandler'

const Container = styled.div`
  height: 92vh;
  display: flex;
  flex-direction: column;
  padding: 0 1em;
  overflow: hidden;
`

const FormSection = styled.div`
  padding-top: 1em;
  height: 84vh;
  bottom: 2px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: min-content;
  grid-gap: 25px;
`

const ButtonSection = styled.div`
  border-top: #52bd95 solid 1px;
  height: 8vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const InputSection = styled.div`
  width: 100%;
`

interface Props {
  projectId: number
  formId: number
}

interface Data {
  [key: string]: string
}

interface KeyValidation {
  [key: string]: boolean
}

/*
  const fieldChanged = (fieldId, value) => {
    debugger
    setValues((currentValues) => {
      currentValues[fieldId] = value;
      return currentValues;
    });
  };
  
 const onSubmit = (e) => {
    e.preventDefault();
    Object.keys(data).forEach(x=>fieldChanged(x, ''))
  };
 */

const Typist = ({ projectId, formId }: Props) => {
  const inputRef = useRef<HTMLInputElement[]>([])
  const { userContext, formContext, fieldTypeContext, projectContext } =
    useAppContext()
  const [project, setProject] = useState<ProjectModel>()
  const [form, setForm] = useState<FormModel>()

  const [data, setData] = useState<Data>({})
  const [isInvalidValid, setIsInvalidValid] = useState<KeyValidation>({})

  useEffect(() => {
    const selectedProject = projectContext.find((x) => x.Id === projectId)
    setProject(selectedProject)
  }, [projectId])

  useEffect(() => {
    const selectedForm = formContext.Forms.find((x) => x.Id === formId)
    const baseData = formContext.FormFields.reduce(
      (a, v) => ({ ...a, [v.Code]: '' }),
      {},
    )
    setForm(selectedForm)
    setData(baseData)
  }, [formId])

  const submit = async (model: SubmitDataModel) => {
    const response = await window.electron.ipc.invoke<FieldTypeModel[]>(
      'submitForm',
      model,
    )
    if (!response) {
      toaster.danger('Error al guardar los datos, intente nuevamente')
    }
    const baseData = formContext.FormFields.reduce(
      (a, v) => ({ ...a, [v.Code]: '' }),
      {},
    )
    setData(baseData)
    inputRef.current[0].focus()
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
    <Container>
      <FormSection>
        {formContext.FormFields.map((field: FormFieldModel, index: number) => {
          const fieldType = fieldTypeContext.find(
            (t) => t.Id === field.FieldTypeId,
          )
          return (
            <InputSection>
              <TextInputField
                ref={(el: HTMLInputElement) => (inputRef.current[index] = el)}
                style={{ fontSize: '18px' }}
                inputHeight={48}
                key={field.Code}
                name={field.Code}
                label={field.Name}
                required={field.Required}
                hint={field?.Description}
                value={data[field.Code]}
                onChange={(e: any) =>
                  handleData(field.Code, e.target.value, field, fieldType)
                }
                validationMessage={
                  isInvalidValid[field.Code]
                    ? fieldType?.ValidationMessage
                    : undefined
                }
              />
            </InputSection>
          )
        })}
      </FormSection>
      <ButtonSection>
        <Button
          onClick={handleSubmit}
          height={48}
          appearance='primary'
          intent='success'
        >
          Guardar (F2)
        </Button>
        <Button
          onClick={handleForceSubmit}
          height={48}
          appearance='primary'
          intent='danger'
        >
          Forzar (F8)
        </Button>
      </ButtonSection>
    </Container>
  )
}

export default Typist
