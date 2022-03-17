/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import useEventListener from '@use-it/event-listener'
import { AutoComplete, Button, Form, Input, message, Space } from 'antd'
import { DataSourceDto } from '../../../dtos/datasource'
import { FormDto } from '../../../dtos/form'
import { FormData } from '../../../dtos/general'
import { FormFieldDto } from '../../../dtos/formField'
import { ProjectDto } from '../../../dtos/project'
import { useAppContext } from '../../context'
import { ButtonSection, Container, FormSection, SummarySection } from './styles'
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
    settingsContext,
  } = useAppContext()

  const ref = useRef<(any | Input | null)[]>([]) // TODO: look for BaseSelectRef type
  const [form] = Form.useForm()
  const [fieldIndex, setFieldIndex] = useState<number>(0)
  const [data, setData] = useState<DataSourceDto>({})
  const [project, setProject] = useState<ProjectDto>()
  const [typistForm, setTypistForm] = useState<FormDto>()
  const [formFields, setFormFields] = useState<FormFieldDto[]>([])
  const [summary, setSummary] = useState<{ count: number; row: string }>({
    count: 0,
    row: '',
  })

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

  const updateFieldIndex = (index: number) => {
    setFieldIndex(index)
    ref.current[index]?.focus()
  }

  const buildSummary = (row: string[]) => {
    const count = (summary?.count || 0) + 1
    const date = new Date().toTimeString().split(' ')
    setSummary({ count, row: `[${date[0]}] | ${row.join(' | ')}` })
  }

  const submit = async (model: FormData, forced?: boolean) => {
    const submitModel = buildSubmitData(
      project!,
      typistForm!,
      formFieldContext,
      model,
      tag,
      userContext,
      settingsContext,
      forced,
    )
    const response = await submitForm(submitModel)

    if (!response) {
      message.error(language.commons.saveError)
      return
    }

    buildSummary(submitModel.values)
    form.resetFields()
    updateFieldIndex(0)
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
    await submit(model, true)
  }

  const handleEnter = () => {
    ref.current[fieldIndex + 1]?.focus()
  }

  const keyDownHandler = (event: KeyboardEvent) => {
    // @ts-expect-error: shortcuts are only valid into a forms
    if (!event.target?.form) return

    const { key } = event

    switch (String(key)) {
      case 'F2':
        handleSubmit()
        break
      case 'F8':
        handleForceSubmit()
        break
      case 'Enter':
        handleEnter()
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
                        customValidator(value, field, type!, language, tag),
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
                      onFocus={() => updateFieldIndex(index)}
                    />
                  ) : (
                    <Input
                      ref={(el) => (ref.current[index] = el)}
                      onFocus={() => updateFieldIndex(index)}
                    />
                  )}
                </Form.Item>
              )
            })}
        </FormSection>
      </Form>

      <SummarySection>
        <span>{summary.row}</span>
        <span>{`${language.typist.rowCount}: ${summary.count}`}</span>
      </SummarySection>
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
