/* eslint-disable react-hooks/exhaustive-deps */
import { Button, TextInputField, toaster } from 'evergreen-ui'
import { useEffect, useState, useRef, ChangeEvent } from 'react'
import { useAppContext } from '../../context'
import {
  FormFieldDto,
  FormDto,
  SubmitFormDto,
  ProjectDto,
  FieldTypeDto,
  FormData,
} from '../../dtos/documents'
import { buildSubmitData, validateFormData } from '../../helpers/forms'
import { Container, FormSection, ButtonSection } from './styles'
import { submitForm } from '../../helpers/db'
import useEventListener from '@use-it/event-listener'

interface Props {
  projectId: number
  formId: number
  tags: string[]
}

interface KeyValidation {
  [key: string]: boolean
}

const TypistModule = ({ projectId, formId, tags }: Props) => {
  const inputRef = useRef<HTMLInputElement[]>([])
  const {
    language,
    userContext,
    formContext,
    formFieldContext,
    fieldTypeContext,
    projectContext,
  } = useAppContext()
  const [project, setProject] = useState<ProjectDto>()
  const [form, setForm] = useState<FormDto>()
  const [formFields, setFormFields] = useState<FormFieldDto[]>([])

  const [data, setData] = useState<FormData>({})
  const [isInvalidValid, setIsInvalidValid] = useState<KeyValidation>({})

  const keyDownHandler = ({ key, target }: any) => {
    if (target.id.includes('TagInput')) return

    if (String(key) == 'Enter') {
      handleSubmit()
    }
    if (String(key) == 'F8') {
      handleForceSubmit()
    }
  }

  useEventListener('keydown', keyDownHandler);

  useEffect(() => {
    const selectedProject = projectContext.find((x) => x.id === projectId)
    setProject(selectedProject)
  }, [projectId])

  useEffect(() => {
    const selectedForm = formContext.find((x) => x.projectId === formId)
    const baseData = formFieldContext.reduce(
      (a, v) => ({ ...a, [v.code]: '' }),
      {},
    )
    const selectedFormFields = formFieldContext.filter(
      (f) => f.formId === formId,
    )

    setForm(selectedForm)
    setFormFields(selectedFormFields)
    setData(baseData)
  }, [formId])

  const submit = async (model: SubmitFormDto) => {
    const response = await submitForm(model)

    if (!response) {
      toaster.danger(language.saveFormErrorMessage)
    }
    const baseData = formFieldContext.reduce(
      (a, v) => ({ ...a, [v.code]: '' }),
      {},
    )
    setData(baseData)
    inputRef.current[0].focus()
  }

  const handleSubmit = async () => {
    if (!tags.length) {
      toaster.danger(language.emptyTagsMessage)
      return
    }

    if (!Object.values(isInvalidValid).every((value) => !value)) {
      toaster.danger(language.invalidFormMessage)
      return
    }
    if (Object.values(data).every((value) => !value)) {
      toaster.danger(language.emptyFormMessage)
      return
    }

    const submitModel = buildSubmitData(
      project!,
      form!,
      formFieldContext,
      data,
      tags,
      userContext.id,
    )
    await submit(submitModel)
  }

  const handleForceSubmit = async () => {
    if (!tags.length) {
      toaster.danger(language.emptyTagsMessage)
      return
    }

    const submitModel = buildSubmitData(
      project!,
      form!,
      formFieldContext,
      data,
      tags,
      userContext.id,
      true,
    )
    await submit(submitModel)
  }

  const handleData = (
    code: string,
    value: string,
    field: FormFieldDto,
    rule?: FieldTypeDto,
  ) => {
    setData({ ...data, [code]: value })
    setIsInvalidValid({
      ...isInvalidValid,
      [code]: !validateFormData(value, field, rule),
    })
  }

  return (
    <Container>
      <FormSection>
        {formFields.map((field, index) => {
          const fieldType = fieldTypeContext.find(
            (t) => t.id === field.fieldTypeId,
          )
          return (
            <TextInputField
              ref={(el: HTMLInputElement) => (inputRef.current[index] = el)}
              style={{ fontSize: '18px', width: '100%' }}
              inputHeight={48}
              key={field.code}
              name={field.code}
              label={field.name}
              required={field.required}
              hint={field?.description}
              value={data[field.code]}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleData(field.code, e.target.value, field, fieldType)
              }
              validationMessage={
                isInvalidValid[field.code]
                  ? fieldType?.validationMessage
                  : undefined
              }
            />
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
          Guardar (Enter)
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

export default TypistModule