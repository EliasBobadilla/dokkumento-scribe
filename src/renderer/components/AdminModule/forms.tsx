import { useState } from 'react'
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
} from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  FormOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import { FormDto } from '../../../dtos/form'
import { useAppContext } from '../../context'
import { deleteForm, upsertForm } from '../../helpers/db'
import { DefaultLayout } from './styles'

const { Option } = Select

export default () => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { language, formContext, setFormContext, projectContext } =
    useAppContext()

  const onDelete = async (id: number) => {
    const result = await deleteForm(id)
    if (result) {
      const newContext = [...formContext]
      const index = newContext.findIndex((x) => x.id === id)
      newContext.splice(index, 1)
      setFormContext(newContext)
    }
  }

  const onSave = async () => {
    try {
      await form.validateFields()
      const model = form.getFieldsValue(true)
      if (!model?.code || !model?.name) {
        message.error(language.commons.saveError)
        return
      }

      const response = await upsertForm(model)
      const newContext = [...formContext]
      const index = newContext.findIndex((x) => x.id === response.id)
      if (index >= 0) newContext[index] = response
      else newContext.unshift(response)

      setFormContext(newContext)
      form.resetFields()
      setIsEdit(false)
    } catch {
      message.error(language.commons.saveError)
    }
  }

  const columns = [
    {
      title: language.project.title,
      dataIndex: 'projectId',
      key: 'projectId',
      width: '30%',
      render: (projectId: number) => (
        <span>{projectContext.find((p) => p.id === projectId)?.name}</span>
      ),
    },
    {
      title: language.project.name,
      dataIndex: 'name',
      key: 'name',
      width: '40%',
    },
    {
      title: language.project.code,
      dataIndex: 'code',
      key: 'code',
      width: '20%',
      render: (code: string) => (
        <Tag color='geekblue' key={code}>
          {code}
        </Tag>
      ),
    },
    {
      title: '',
      key: 'action',
      width: '10%',
      render: (record: FormDto) => (
        <Space size='large'>
          <EditOutlined
            onClick={() => {
              form.setFieldsValue(record)
              setIsEdit(true)
            }}
          />
          <Popconfirm
            title={language.commons.deleteMessage}
            onConfirm={() => onDelete(record.id!)}
            okText={language.commons.okText}
            cancelText={language.commons.cancelText}
          >
            <DeleteOutlined style={{ color: 'red' }} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

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
        <DefaultLayout>
          <Card size='small'>
            <Form form={form} name='TypistForm' layout='vertical'>
              <Form.Item
                name='projectId'
                label={language.form.placeholder1}
                rules={[
                  {
                    required: true,
                    message: language.commons.requiredFieldErrorMessage,
                  },
                ]}
              >
                <Select
                  allowClear
                  disabled={isEdit}
                  placeholder={language.form.placeholder2}
                >
                  {projectContext.map((p) => (
                    <Option key={p.code} value={p.id}>
                      {p.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={language.form.code}
                name='code'
                rules={[
                  {
                    required: true,
                    message: language.commons.requiredFieldErrorMessage,
                  },
                  {
                    pattern: new RegExp(/^[A-Z_]{1,10}/),
                    message: language.commons.requiredFieldErrorMessage,
                  },
                ]}
              >
                <Input disabled={isEdit} />
              </Form.Item>

              <Form.Item
                label={language.form.name}
                name='name'
                rules={[
                  {
                    required: true,
                    message: language.commons.requiredFieldErrorMessage,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
            <Button type='primary' size='large' block onClick={onSave}>
              {isEdit ? language.commons.edit : language.commons.save}
            </Button>
          </Card>
          <Card size='small'>
            <Table
              scroll={{ y: 350 }}
              columns={columns}
              dataSource={formContext.map((p) => ({
                key: p.id,
                ...p,
              }))}
              pagination={false}
            />
          </Card>
        </DefaultLayout>
      </Modal>
    </>
  )
}
