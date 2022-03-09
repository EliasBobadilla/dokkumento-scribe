import { useState } from 'react'
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
} from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  FolderOpenOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import { ProjectDto } from '../../../dtos/project'
import { useAppContext } from '../../context'
import { deleteProject, upsertProject } from '../../helpers/db'
import { DefaultLayout } from './styles'

export default () => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { language, projectContext, setProjectContext } = useAppContext()

  const onDelete = async (id: number) => {
    const result = await deleteProject(id)
    if (result) {
      const newContext = [...projectContext]
      const index = newContext.findIndex((x) => x.id === id)
      newContext.splice(index, 1)
      setProjectContext(newContext)
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

      const response = await upsertProject(model)
      const newContext = [...projectContext]
      const index = newContext.findIndex((x) => x.id === response.id)
      if (index >= 0) newContext[index] = response
      else newContext.unshift(response)

      setProjectContext(newContext)
      form.resetFields()
      setIsEdit(false)
    } catch {
      message.error(language.commons.saveError)
    }
  }

  const columns = [
    {
      title: language.project.name,
      dataIndex: 'name',
      key: 'name',
      width: '60%',
    },
    {
      title: language.project.code,
      dataIndex: 'code',
      key: 'code',
      width: '30%',
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
      render: (record: ProjectDto) => (
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
        icon={<FolderOpenOutlined />}
        onClick={() => {
          setVisible(true)
          form.resetFields()
        }}
      >
        {language.project.title}
      </Button>

      <Modal
        title={language.project.title}
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
                label={language.project.code}
                name='code'
                rules={[
                  {
                    required: true,
                    message: language.commons.requiredFieldErrorMessage,
                  },
                  {
                    pattern: new RegExp(/^[A-Z_]{1,10}/),
                    message: language.commons.codeFieldErrorMessage,
                  },
                ]}
              >
                <Input disabled={isEdit} />
              </Form.Item>

              <Form.Item
                label={language.project.name}
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
              dataSource={projectContext.map((p) => ({
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
