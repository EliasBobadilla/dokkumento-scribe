/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react'
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Select,
  Checkbox,
  Table,
  Space,
} from 'antd'
import {
  FormOutlined,
  SearchOutlined,
  FileOutlined,
  FileExcelOutlined,
} from '@ant-design/icons'
import { FormDto } from 'dtos/form'
import exportFromJSON from 'export-from-json'
import { getDataFromDigTable } from '../../helpers/db'
import { useAppContext } from '../../context'
import { FormDataSection } from './styles'

const { Option } = Select

const fixedOptions = [
  { value: 'TAGS', label: 'Lote/Caja' },
  { value: 'HOST', label: 'PC' },
]

export default () => {
  const [dataForm] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [cols, setCols] = useState<any[]>([])
  const [data, setData] = useState<any[]>([])
  const [fields, setFields] = useState<string[]>([])
  const [form, setForm] = useState<FormDto>()
  const [options, setOptions] = useState<
    {
      label: string
      value: string
    }[]
  >([])

  const { language, formContext, projectContext, formFieldContext } =
    useAppContext()

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
    if (!value) {
      dataForm.resetFields()
      setOptions([])
      setFields([])
      setData([])
      setCols([])
      setForm(undefined)
      return
    }

    const ids = value.split('-')
    const currentForm = formContext.find((f) => f.id === +ids[1])
    const currentFields = formFieldContext.filter((f) => f.formId === +ids[1])
    const currentOptions = currentFields.map((f) => ({
      label: f.name,
      value: f.code,
    }))
    currentOptions.push(...fixedOptions)

    setForm(currentForm)
    setOptions(currentOptions)
  }

  const onFieldsChange = (fieldList: string[]) => {
    setCols(
      fieldList.map((element) => ({
        title: options.find((x) => x.value === element)?.label,
        dataIndex: element,
        key: element,
      })),
    )
    setFields(fieldList)
  }

  const onSearch = async () => {
    if (!form || !fields.length) return
    const { ffName, ffValue } = dataForm.getFieldsValue()

    const response = await getDataFromDigTable({
      table: form.digTable,
      fields,
      filter: { field: ffName, value: ffValue },
    })
    setData(response.map((row, index) => ({ key: index, ...row })))
  }

  const onExcelDownload = async () => {
    exportFromJSON({
      data: data.map((row) =>
        options.reduce((acc, o) => ({ ...acc, [o.label]: row[o.value] }), {}),
      ),
      fileName: `${form?.name}_${new Date().toISOString().slice(0, 10)}`,
      exportType: exportFromJSON.types.xls,
    })
  }

  const onJsonDownload = async () => {
    exportFromJSON({
      data: data.map((row) =>
        options.reduce((acc, o) => ({ ...acc, [o.label]: row[o.value] }), {}),
      ),
      fileName: `${form?.name}_${new Date().toISOString().slice(0, 10)}`,
      exportType: exportFromJSON.types.json,
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
          dataForm.resetFields()
        }}
      >
        {language.data.title}
      </Button>

      <Modal
        title={language.data.title}
        destroyOnClose
        centered
        visible={visible}
        onCancel={() => {
          dataForm.resetFields()
          setVisible(false)
        }}
        footer={null}
        width='90%'
      >
        <Card size='small'>
          <Form form={dataForm} name='dataForm' layout='vertical'>
            <Form.Item
              name='projectForm'
              label={language.data.formLabel}
              rules={[
                {
                  required: true,
                  message: language.commons.requiredFieldErrorMessage,
                },
              ]}
            >
              <Select allowClear onChange={onFormChange}>
                {projectFormOptions}
              </Select>
            </Form.Item>
            <FormDataSection>
              <Form.Item
                label={language.data.filterNameLabel}
                style={{ minWidth: '200px' }}
                name='ffName'
                rules={[
                  {
                    required: true,
                    message: language.commons.requiredFieldErrorMessage,
                  },
                ]}
              >
                <Select allowClear>
                  {options.map((x) => (
                    <Option key={x.value} value={x.value}>
                      {x.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={language.data.filterValueLabel}
                style={{ minWidth: '200px' }}
                name='ffValue'
                rules={[
                  {
                    required: true,
                    message: language.commons.requiredFieldErrorMessage,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Button
                type='default'
                onClick={onSearch}
                icon={<SearchOutlined />}
                style={{ marginTop: '6px' }}
              >
                {language.data.searchButton}
              </Button>
              <Button
                type='primary'
                onClick={onExcelDownload}
                icon={<FileExcelOutlined />}
                style={{ marginTop: '6px' }}
              >
                {`${language.data.excelDownloadButton} (${data.length})`}
              </Button>
              <Button
                type='primary'
                onClick={onJsonDownload}
                icon={<FileOutlined />}
                style={{ marginTop: '6px' }}
              >
                {`${language.data.jsonDownloadButton} (${data.length})`}
              </Button>
            </FormDataSection>
          </Form>
          <Space>
            <Checkbox.Group
              options={options}
              onChange={(values) => onFieldsChange(values as string[])}
              style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px #d1d7d9 dashed',
                minWidth: '200px',
                padding: '10px',
                height: '250px',
                overflow: 'auto',
              }}
            />
            <Table
              scroll={{ y: 210 }}
              columns={cols}
              dataSource={data}
              pagination={false}
              size='small'
              style={{
                height: '250px',
                overflow: 'hidden',
              }}
            />
          </Space>
        </Card>
      </Modal>
    </>
  )
}
