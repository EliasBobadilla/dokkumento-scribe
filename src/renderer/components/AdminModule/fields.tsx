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
    const id = `${p?.id}-${f.id}`
    return (
      <Option key={id} value={id}>
        {label}
      </Option>
    )
  })

  const onFormChange = (value: string) => {
    const ids = value.split('-')
    const fields = formFieldContext.filter((f) => +f.formId === +ids[1])
    form.setFieldsValue({
      fields,
    })
  }

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
        {language.field.title}
      </Button>

      <Modal
        title={language.field.title}
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
          <Form form={form} name='FieldForm' layout='vertical'>
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
              <Select
                allowClear
                placeholder={language.field.placeholder1}
                onChange={onFormChange}
              >
                {projectFormOptions}
              </Select>
            </Form.Item>
            <FormListContainer>
              <Form.List name='fields'>
                {(fields, { add, remove }) => {
                  const dbFields = form.getFieldValue(['fields']) || []
                  return (
                    <>
                      <Form.Item>
                        <Button
                          type='dashed'
                          block
                          onClick={() => add({ order: dbFields.length + 1 }, 0)}
                          icon={<PlusOutlined />}
                        >
                          {language.commons.addField}
                        </Button>
                      </Form.Item>
                      {fields.map(({ key, name, ...rest }, index) => (
                        <Space
                          key={key}
                          style={{
                            display: 'flex',
                            marginBottom: 10,
                            border: '1px #d1d7d9 dashed',
                            padding: '10px',
                            height: 'auto ',
                            flexWrap: 'wrap',
                          }}
                          align='baseline'
                        >
                          <Form.Item
                            {...rest}
                            label={language.field.order}
                            name={[name, 'order']}
                            key={`${key}-order`}
                            rules={[
                              {
                                required: true,
                                message:
                                  language.commons.requiredFieldErrorMessage,
                              },
                            ]}
                          >
                            <InputNumber style={{ width: '55px' }} />
                          </Form.Item>
                          <Form.Item
                            {...rest}
                            label={language.field.fieldType}
                            name={[name, 'fieldTypeId']}
                            key={`${key}-fieldTypeId`}
                            rules={[
                              {
                                required: true,
                                message:
                                  language.commons.requiredFieldErrorMessage,
                              },
                            ]}
                          >
                            <Select
                              allowClear
                              placeholder={language.field.placeholder2}
                            >
                              {fieldTypeContext.map((x) => (
                                <Option
                                  key={x.id}
                                  value={x.id}
                                >{`${x.code} - ${x.name}`}</Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            {...rest}
                            label={language.field.code}
                            name={[name, 'code']}
                            key={`${key}-code`}
                            rules={[
                              {
                                required: true,
                                pattern: new RegExp(/^[A-Z0-9]+$/i),
                                message:
                                  language.commons.requiredFieldErrorMessage,
                              },
                            ]}
                          >
                            <Input disabled={dbFields[index]?.id} />
                          </Form.Item>
                          <Form.Item
                            {...rest}
                            label={language.field.name}
                            name={[name, 'name']}
                            key={`${key}-name`}
                            rules={[
                              {
                                required: true,
                                message:
                                  language.commons.requiredFieldErrorMessage,
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            {...rest}
                            label={language.field.minLen}
                            name={[name, 'minLength']}
                            key={`${key}-minLength`}
                          >
                            <InputNumber style={{ width: '65px' }} />
                          </Form.Item>
                          <Form.Item
                            {...rest}
                            label={language.field.maxLen}
                            name={[name, 'maxLength']}
                            key={`${key}-maxLength`}
                          >
                            <InputNumber style={{ width: '65px' }} />
                          </Form.Item>
                          <Form.Item
                            {...rest}
                            label={language.field.datasource}
                            name={[name, 'datasource']}
                            key={`${key}-datasource`}
                          >
                            <Select
                              allowClear
                              placeholder={language.field.placeholder3}
                            >
                              {Object.keys(datasourceContext).map((k) => (
                                <Option key={k} value={k}>
                                  {k}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            {...rest}
                            label={language.field.required}
                            name={[name, 'required']}
                            key={`${key}-required`}
                            valuePropName='checked'
                          >
                            <Switch />
                          </Form.Item>
                          <Form.Item
                            {...rest}
                            label={language.field.uppercase}
                            name={[name, 'uppercase']}
                            key={`${key}-uppercase`}
                            valuePropName='checked'
                          >
                            <Switch />
                          </Form.Item>
                          <div style={{ width: '900px' }}>
                            <Form.Item
                              {...rest}
                              label={language.field.code}
                              name={[name, 'dbValidation']}
                              key={`${key}-dbValidation`}
                            >
                              <Input.TextArea
                                rows={2}
                                placeholder='SELECT COUNT(ID) AS COUNT FROM $TABLE (NOLOCK) WHERE [FIRST]=[$CODE] AND [TAGS]=[$TAG]'
                              />
                            </Form.Item>
                            {!dbFields[index]?.id && (
                              <MinusCircleOutlined
                                onClick={() => remove(name)}
                              />
                            )}
                          </div>
                        </Space>
                      ))}
                    </>
                  )
                }}
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
