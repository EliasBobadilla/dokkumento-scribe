/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import useEventListener from '@use-it/event-listener'
import { Form, Button, message, AutoComplete, Input } from 'antd'
import {
  FormData,
  FormDto,
  FormFieldDto,
  ProjectDto,
  DataSourceDto,
} from '../../dtos/documents'
import { useAppContext } from '../../context'
import { Container, FormSection, ButtonSection } from './styles'
import { buildSubmitData, customValidator } from '../../helpers/forms'
import { submitForm } from '../../helpers/db'

interface Props {
  projectId: number
  formId: number
  tag: string
}

export default ({ projectId, formId, tag }: Props) => {
  const {
    language,
    userContext,
    formContext,
    formFieldContext,
    fieldTypeContext,
    projectContext,
    datasourceContext,
  } = useAppContext()

  const ref = useRef<(any | Input | null)[]>([]) // TODO: look for BaseSelectRef type
  const [form] = Form.useForm()
  const [data, setData] = useState<DataSourceDto>({})
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

  const onSearch = (td: string, code: string, value: string) => {
    const newData = { ...data }
    const searchedValue = value.toUpperCase()

    const contains = (item: { value: string }) => {
      const option = item.value.toUpperCase()
      return option.includes(searchedValue)
    }

    newData[code] = datasourceContext[td].filter((x) => contains(x))
    setData(newData)
  }

  const submit = async (model: FormData) => {
    const submitModel = buildSubmitData(
      project!,
      typistForm!,
      formFieldContext,
      model,
      tag,
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
    try {
      await form.validateFields()

      const model = form.getFieldsValue()

      if (!tag) {
        message.error(language.typist.emptyTagMessage)
        return
      }

      if (Object.entries(model).every(([_, value]) => !value)) {
        message.error(language.typist.emptyFormMessage)
        return
      }

      await submit(model)
    } catch {
      message.error(language.typist.invalidFormMessage)
    }
  }

  const handleForceSubmit = async () => {
    if (!tag) {
      message.error(language.typist.emptyTagMessage)
      return
    }
    const model = form.getFieldsValue()
    await submit(model)
  }

  const keyDownHandler = ({ key }: any) => {
    // TODO: lokk for correct type
    switch (String(key)) {
      case 'F2':
        handleSubmit()
        break
      case 'F8':
        handleForceSubmit()
        break
      default:
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
                        customValidator(value, field, type!, language),
                    },
                  ]}
                >
                  {Array.isArray(datasourceContext[field.datasource]) ? (
                    <AutoComplete
                      key={field.code}
                      ref={(el) => (ref.current[index] = el)}
                      onSearch={(value) =>
                        onSearch(field.datasource, field.code, value)
                      }
                      options={data[field.code] || []}
                    />
                  ) : (
                    <Input ref={(el) => (ref.current[index] = el)} />
                  )}
                </Form.Item>
              )
            })}
        </FormSection>
      </Form>

      <ButtonSection>
        <Button onClick={handleSubmit} type='primary' size='large'>
          {language.typist.save} (F2)
        </Button>
        <Button onClick={handleForceSubmit} type='primary' size='large' danger>
          {language.typist.forcedSave} (F8)
        </Button>
      </ButtonSection>
    </Container>
  )
}
