/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react'
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Switch,
  InputNumber,
} from 'antd'
import {
  FormOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { upsertFormFields } from '../../helpers/db'
import { FormFieldDto } from '../../../dtos/formField'
import { useAppContext } from '../../context'
import { FormListContainer } from './styles'

const { Option } = Select

export default () => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)

  const {
    language,
    formContext,
    projectContext,
    fieldTypeContext,
    datasourceContext,
    formFieldContext,
    setFormFieldContext,
  } = useAppContext()

  const onSave = async () => {
    try {
      await form.validateFields()
      const model = form.getFieldsValue(true)

      const ids = model.projectId.split('-')

      const dto: FormFieldDto[] = model.fields.map((f: FormFieldDto) => ({
        ...f,
        projectId: ids[0],
        formId: ids[1],
      }))

      const response = await upsertFormFields(dto)

      const newContext = [...formFieldContext]
      response.forEach((element) => {
        const index = newContext.findIndex((x) => x.id === element.id)
        if (index >= 0) newContext[index] = element
        else newContext.push(element)
      })
      setFormFieldContext(newContext)
      form.resetFields()
      setVisible(false)
    } catch {
      message.error(language.commons.saveError)
    }
  }

  const projectFormOptions = formContext.map((f, i) => {
    const p = projectContext.find((x) => x.id === f.projectId)
    const label = `${i + 1}. ${f.code} - ${f.name} - (${p?.code} - ${p?.name})`
    return (
      <Option key={`${p?.id}-${f.id}`} value={`${p?.id}-${f.id}`}>
        {label.toUpperCase()}
      </Option>
    )
  })

  return (
    <>
      <Button
        type='dashed'
        size='large'
        icon={<FormOutlined />}
        onClick={() => {
          setVisible(true)
          form.resetFields()
        }}
      >
        {language.form.title}
      </Button>

      <Modal
        title={language.form.title}
        destroyOnClose
        centered
        visible={visible}
        onCancel={() => {
          form.resetFields()
          setVisible(false)
        }}
        footer={null}
        width='90%'
      >
        <Card size='small'>
          <Form form={form} name='TypistForm' layout='vertical'>
            <Form.Item
              name='projectId'
              label={language.field.placeholder1}
              rules={[
                {
                  required: true,
                  message: language.commons.requiredFieldErrorMessage,
                },
              ]}
            >
              <Select allowClear placeholder={language.field.placeholder1}>
                {projectFormOptions}
              </Select>
            </Form.Item>
            <FormListContainer>
              <Form.List name='fields'>
                {(fields, { add, remove }) => (
                  <>
                    <Form.Item>
                      <Button
                        type='dashed'
                        block
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        {language.commons.addField}
                      </Button>
                    </Form.Item>
                    {fields.map(({ key, name, ...rest }) => {
                      const mela = ''
                      return <div>TODO: volver a colocar los campos</div>
                    })}
                  </>
                )}
              </Form.List>
            </FormListContainer>
          </Form>
          <Button
            type='primary'
            size='large'
            block
            onClick={onSave}
            style={{ marginTop: '20px' }}
          >
            {language.commons.save}
          </Button>
        </Card>
      </Modal>
    </>
  )
}
