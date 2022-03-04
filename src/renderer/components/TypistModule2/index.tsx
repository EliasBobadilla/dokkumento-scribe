/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import useEventListener from '@use-it/event-listener'
import { Form, Input, Button, message, AutoComplete } from 'antd'
import {
  FormData,
  FormDto,
  FormFieldDto,
  ProjectDto,
} from '../../dtos/documents'
import { useAppContext } from '../../context'
import { Container, FormSection, ButtonSection } from './styles'
import { buildSubmitData, customValidator } from '../../helpers/forms'
import { submitForm } from '../../helpers/db'

interface Props {
  projectId: number
  formId: number
  tags: string[]
}

const DATA = {
  TD_NAMES: [
    { value: 'yuri' },
    { value: 'elias' },
    { value: 'bobadilla' },
    { value: 'villafana' },
    { value: 'sebastian' },
    { value: 'tilsa' },
    { value: 'myriam' },
    { value: 'camarena' },
    { value: 'cardenas' },
    { value: 'Ysabel' },
  ],
  TD_SEDES: [
    { value: 'Comas' },
    { value: 'Los Olivos' },
    { value: 'Surco' },
    { value: 'San Juan de Lurigancho' },
    { value: 'San Martin de Porres' },
  ],
}

export default ({ projectId, formId, tags }: Props) => {
  const {
    language,
    userContext,
    formContext,
    formFieldContext,
    fieldTypeContext,
    projectContext,
  } = useAppContext()

  const ref = useRef<(Input | null)[]>([])
  const [form] = Form.useForm()
  const [data, setData] = useState({})
  const [project, setProject] = useState<ProjectDto>()
  const [typistForm, setTypistForm] = useState<FormDto>()
  const [formFields, setFormFields] = useState<FormFieldDto[]>([])

  useEffect(() => {
    setProject(projectContext.find((x) => x.id === projectId))
  }, [projectId])

  useEffect(() => {
    setTypistForm(formContext.find((x) => x.id === formId))
    setFormFields(formFieldContext.filter((f) => f.formId === formId))
  }, [formId])

  const onSearch = (td: string, value: string) => {
    if (!DATA[td]) return
    const newData = { ...data }
    newData[td] = DATA[td].filter((x) => x.value.includes(value)).slice(0, 5)
    setData(newData)
  }

  const submit = async (model: FormData) => {
    const submitModel = buildSubmitData(
      project!,
      typistForm!,
      formFieldContext,
      model,
      tags,
      userContext.id,
    )
    const response = await submitForm(submitModel)

    if (!response) {
      message.error(language.saveFormErrorMessage)
      return
    }

    form.resetFields()
    ref.current[0]?.focus()
  }

  const handleSubmit = async () => {
    const model = form.getFieldsValue()
    await submit(model)
    console.log('handleSubmit =>', model)
  }

  const handleForceSubmit = async () => {
    const model = form.getFieldsValue()
    await submit(model)
    console.log('handleForceSubmit =>', model)
  }

  const keyDownHandler = ({ key }: any) => {
    switch (String(key)) {
      case 'F2':
        handleSubmit()
        break
      case 'F8':
        handleForceSubmit()
        break
      default:
        console.log('Unhandled method')
    }
  }

  useEventListener('keydown', keyDownHandler)

  return (
    <Container>
      <Form form={form} name='TypistForm' layout='vertical'>
        <FormSection>
          {formFields
            .sort((a, b) => a.order - b.order)
            .map((field, index) => {
              const type = fieldTypeContext.find(
                (t) => t.id === field.fieldTypeId,
              )
              return (
                <Form.Item
                  key={field.code}
                  name={field.code}
                  label={field.name}
                  rules={[
                    {
                      validator: (_, value) =>
                        customValidator(value, field, type!),
                    },
                  ]}
                >
                  {/* <Input ref={(el) => (ref.current[index] = el)} /> */}
                  <AutoComplete
                    onSearch={(value) => onSearch('TD_NAMES', value)}
                    options={data.TD_NAMES}
                    placeholder='input here'
                  />
                </Form.Item>
              )
            })}
        </FormSection>
      </Form>

      <ButtonSection>
        <Button onClick={handleSubmit}>Guardar (F2)</Button>
        <Button onClick={handleForceSubmit}>Forzar (F8)</Button>
      </ButtonSection>
    </Container>
  )
}
