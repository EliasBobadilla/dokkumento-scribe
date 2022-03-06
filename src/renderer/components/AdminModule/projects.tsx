import { useState } from 'react'
import {
  Table,
  Space,
  Form,
  Input,
  Modal,
  Button,
  Card,
  Popconfirm,
  message,
} from 'antd'
import {
  EditOutlined,
  FolderOpenOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useAppContext } from '../../context'
import { upsertProject, deleteProject } from '../../helpers/db'
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
    const model = form.getFieldsValue(true)
    if (!model?.code || !model?.name) {
      message.error(language.projectCreator.saveError)
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
  }

  const columns = [
    {
      title: language.projectCreator.name,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: language.projectCreator.code,
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '',
      key: 'action',
      render: (record: any) => (
        <Space size='large'>
          <EditOutlined
            onClick={() => {
              form.setFieldsValue(record)
              setIsEdit(true)
            }}
          />
          <Popconfirm
            title={language.projectCreator.deleteMessage}
            onConfirm={() => onDelete(record.key)}
            okText={language.projectCreator.okText}
            cancelText={language.projectCreator.cancelText}
          >
            <DeleteOutlined style={{ color: 'red' }} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const data = projectContext.map((p) => ({
    key: p.id,
    ...p,
  }))

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
        {language.projectCreator.title}
      </Button>

      <Modal
        title={language.projectCreator.title}
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
                label={language.projectCreator.code}
                name='code'
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input disabled={isEdit} />
              </Form.Item>

              <Form.Item
                label={language.projectCreator.name}
                name='name'
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
            <Button type='primary' size='large' block onClick={onSave}>
              {isEdit
                ? language.projectCreator.edit
                : language.projectCreator.save}
            </Button>
          </Card>
          <Card size='small'>
            <Table
              scroll={{ y: 350 }}
              columns={columns}
              dataSource={data}
              pagination={false}
            />
          </Card>
        </DefaultLayout>
      </Modal>
    </>
  )
}
