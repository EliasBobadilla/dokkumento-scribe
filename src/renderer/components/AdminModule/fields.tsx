import { useState } from 'react'
import {
  Button,
  Dialog,
  Pane,
  ProjectsIcon,
  Alert,
  IconButton,
  TrashIcon,
  toaster,
  TextInput,
  Switch,
  Select,
  PlusIcon,
  Text,
} from 'evergreen-ui'
import { FormDto, FormFieldDto } from 'renderer/dtos/documents'
import { useAppContext } from '../../context'
import { upsertFormFields } from '../../helpers/db'
import { FieldContainer, FormDataSection } from './styles'

const formInitialState = { projectId: 0, code: '', name: '' }
const formFieldInitialState = {
  projectId: 0,
  formId: 0,
  fieldTypeId: 0,
  code: '',
  name: '',
  description: '',
  minLength: 0,
  maxLength: 0,
  uppercase: true,
  required: true,
}
export default () => {
  const {
    language,
    projectContext,
    formContext,
    formFieldContext,
    fieldTypeContext,
    setFormFieldContext,
  } = useAppContext()

  const [isShown, setIsShown] = useState(false)
  const [selectedForm, setSelectedForm] = useState<FormDto>({
    ...formInitialState,
  })
  const [selectedFields, setSelectedFields] = useState<FormFieldDto[]>([])

  const onSave = async () => {
    if (!selectedForm?.id) {
      toaster.danger(language.formManager.saveError)
      return
    }

    if (!selectedForm?.code || !selectedForm?.name) {
      toaster.danger(language.formManager.saveError)
      return
    }

    const model = selectedFields.map((m) => ({
      ...m,
      formId: selectedForm.id,
      projectId: selectedForm.projectId,
    }))

    console.log('model =>', model)
    const response = await upsertFormFields(model)

    debugger
    const newContext = [...formFieldContext]
    response.forEach((element) => {
      const index = newContext.findIndex((x) => x.id === element.id)
      if (index >= 0) newContext[index] = element
      else newContext.push(element)
    })
    setFormFieldContext(newContext)
    setSelectedForm({ ...formInitialState })
    setSelectedFields([])
    setIsShown(!isShown)
  }

  const onFormChange = async (id: number) => {
    setSelectedForm(
      formContext.find((x) => x.id === id) || { ...formInitialState },
    )
    setSelectedFields(formFieldContext.filter((x) => x.formId === id))
  }

  const onFormFieldChange = (
    index: number,
    field: string,
    value: string | boolean | number,
  ) => {
    const list = [...selectedFields]
    list[index][field] = value
    setSelectedFields(list)
  }

  const removeField = (i: number) => {
    const list = [...selectedFields]
    list.splice(i, 1)
    setSelectedFields(list)
  }

  const addField = () => {
    const list = [...selectedFields]
    list.push({ ...formFieldInitialState })
    setSelectedFields(list)
  }

  const buildFormLabel = formContext.map((x) => {
    const p = projectContext.find((y) => y.id === x.projectId)
    return {
      label: `${p.code} - ${p?.name} / ${x.code} - ${x.name}`,
      value: x.id,
    }
  })

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        width='95%'
        title={language.formManager.title}
        confirmLabel={language.formManager.save}
        hasCancel
        onCancel={() => setIsShown(!isShown)}
        onConfirm={() => onSave()}
      >
        {({ close }) => (
          <Pane>
            <FormDataSection>
              <Select
                height={40}
                width='98%'
                onChange={(e) => onFormChange(+e.target.value)}
              >
                <option key='0' value={0}>
                  {language.formManager.placeholder}
                </option>
                {buildFormLabel.map((x) => (
                  <option key={x.value} value={x.value}>
                    {x.label}
                  </option>
                ))}
              </Select>
              <IconButton
                icon={PlusIcon}
                intent='success'
                height={40}
                onClick={() => addField()}
              />
            </FormDataSection>
            <Alert
              intent='none'
              title={language.formManager.alert}
              marginTop={20}
              marginBottom={20}
            />
            {selectedFields.map((field, index) => {
              return (
                <FieldContainer key={`${field.id}_${index}`}>
                  <div style={{ width: '200px' }}>
                    <Select
                      value={field.fieldTypeId}
                      onChange={(e) =>
                        onFormFieldChange(index, 'fieldTypeId', +e.target.value)
                      }
                    >
                      <option key='0' value={0}>
                        {language.formManager.placeholder}
                      </option>
                      {fieldTypeContext.map((x) => (
                        <option
                          key={x.id}
                          value={x.id}
                        >{`${x.code} - ${x.name}`}</option>
                      ))}
                    </Select>
                  </div>
                  <TextInput
                    width={100}
                    disabled={field?.id > 0}
                    value={field.code}
                    placeholder={language.formCreator.code}
                    onChange={(e) =>
                      onFormFieldChange(index, 'code', e.target.value)
                    }
                  />
                  <TextInput
                    value={field.name}
                    placeholder={language.formCreator.name}
                    onChange={(e) =>
                      onFormFieldChange(index, 'name', e.target.value)
                    }
                  />
                  <TextInput
                    width={75}
                    type='number'
                    value={field.minLength}
                    placeholder={language.formCreator.minLen}
                    onChange={(e) =>
                      onFormFieldChange(index, 'minLength', +e.target.value)
                    }
                  />
                  <TextInput
                    width={75}
                    type='number'
                    value={field.maxLength}
                    placeholder={language.formCreator.maxLen}
                    onChange={(e) =>
                      onFormFieldChange(index, 'maxLength', +e.target.value)
                    }
                  />
                  <Text>Requerido</Text>
                  <Switch
                    height={20}
                    checked={field.required}
                    placeholder={language.formCreator.required}
                    onChange={(e) =>
                      onFormFieldChange(index, 'required', e.target.checked)
                    }
                  />
                  <Text>Mayusculas</Text>
                  <Switch
                    height={20}
                    checked={field.uppercase}
                    placeholder={language.formCreator.uppercase}
                    onChange={(e) =>
                      onFormFieldChange(index, 'uppercase', e.target.checked)
                    }
                  />
                  <IconButton
                    icon={TrashIcon}
                    intent='danger'
                    height={40}
                    onClick={() => removeField(index)}
                  />
                </FieldContainer>
              )
            })}
          </Pane>
        )}
      </Dialog>
      <Button
        width={300}
        onClick={() => setIsShown(!isShown)}
        height={60}
        intent='success'
        iconBefore={ProjectsIcon}
      >
        {language.formManager.title}
      </Button>
    </Pane>
  )
}
