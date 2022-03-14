/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import useEventListener from '@use-it/event-listener'
import { AutoComplete, Button, Form, Input, message } from 'antd'
import { DataSourceDto } from '../../../dtos/datasource'
import { FormDto } from '../../../dtos/form'
import { FormData } from '../../../dtos/general'
import { FormFieldDto } from '../../../dtos/formField'
import { ProjectDto } from '../../../dtos/project'
import { useAppContext } from '../../context'
import { ButtonSection, Container, FormSection } from './styles'
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

    newData[code] = datasourceContext[td].filter((item) =>
      item.value.includes(searchedValue),
    )
    setData(newData)
  }

  const submit = async (model: FormData) => {
    const submitModel = buildSubmitData(
      project!,
      typistForm!,
      formFieldContext,
      model,
      tag,
      userContext,
    )
    const response = await submitForm(submitModel)

    if (!response) {
      message.error(language.commons.saveError)
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
        message.error(language.typist.emptyTagMessage, 1)
        return
      }

      if (Object.values(model).every((value) => !value)) {
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
      message.error(language.typist.emptyTagMessage, 1)
      return
    }
    const model = form.getFieldsValue()
    await submit(model)
  }

  const keyDownHandler = ({ key }: any) => {
    // TODO: look for correct type
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
