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
} from 'evergreen-ui'
import { FormDto, FormFieldDto, ProjectDto } from 'renderer/dtos/documents'
import { useAppContext } from '../../context'
import {
  upsertForm,
  getForms,
  getFormFields,
  upsertFormFields,
} from '../../helpers/db'
import { FormDataSection, FieldContainer } from './styles'

export default () => {
  const [isShown, setIsShown] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectDto>()
  const [selectedForm, setSelectedForm] = useState<FormDto>()
  const [selectedFields, setSelectedFields] = useState<FormFieldDto[]>([])

  const {
    language,
    projectContext,
    formContext,
    setFormContext,
    formFieldContext,
    setFormFieldContext,
    fieldTypeContext,
  } = useAppContext()

  const onProjectChange = async (id: number) => {
    setSelectedProject(projectContext.find((x) => x.id === id))
    const [forms, formFields] = await Promise.all([
      getForms(id),
      getFormFields(id),
    ])
    setFormContext(forms)
    setFormFieldContext(formFields)
  }

  const onFormChange = (id: number) => {
    setSelectedFields(formFieldContext.filter((x) => x.formId === id))
    setSelectedForm(formContext.find((x) => x.id === id))
  }

  const onFormFieldChange = (
    field: string,
    value: string | boolean | number,
    index: number,
  ) => {
    const list = [...selectedFields]
    list[index][field] = value
    setSelectedFields(list)
  }

  const onSave = async () => {
    if (!selectedProject || !selectedForm) {
      toaster.danger(language.projectOnSaveError)
      return
    }

    const response = await upsertForm({
      project: selectedProject,
      form: selectedForm,
      fields: selectedFields,
    })

    debugger

    console.log(response)
    /*
    const newContext = [...formContext]
    const index = newContext.findIndex((x) => x.id === response.id)
    if (index >= 0) newContext[index] = response
    else newContext.push(response)

    setFormContext(newContext)
    setSelectedForm(initialState)
    setIsShown(!isShown)
    */
  }

  const newFields = (i: number) => {
    const list = [...selectedFields]
    list.splice(i, 1)
    setSelectedFields(list)
  }

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        width='95%'
        title={language.formMainTitle}
        confirmLabel={language.save}
        hasCancel
        onCancel={() => setIsShown(!isShown)}
        onConfirm={() => onSave()}
      >
        {({ close }) => (
          <Pane>
            <FormDataSection>
              <Select
                value={selectedForm?.projectId}
                placeholder='Selecciona un proyecto'
                onChange={(e) => onProjectChange(+e.target.value)}
              >
                {projectContext.map((x) => (
                  <option value={x.id}>{`${x.code} - ${x.name}`}</option>
                ))}
              </Select>

              <Select
                value={selectedForm?.id}
                placeholder='Selecciona un formulario'
                onChange={(e) => onFormChange(+e.target.value)}
              >
                {formContext.map((x) => (
                  <option value={x.id}>{`${x.code} - ${x.name}`}</option>
                ))}
              </Select>
              <input type='text' name='format' value='' />
              <TextInput
                required
                value={selectedForm?.code}
                placeholder={language.formCreator.code}
                onChange={(e) =>
                  setSelectedForm({
                    ...selectedForm,
                    code: e.target.value,
                  } as FormDto)
                }
              />
              <TextInput
                required
                value={selectedForm?.name}
                placeholder={language.formCreator.code}
                onChange={(e) =>
                  setSelectedForm({
                    ...selectedForm,
                    name: e.target.value,
                  } as FormDto)
                }
              />
            </FormDataSection>
            <Alert
              intent='none'
              title={language.projectAlert}
              marginTop={20}
              marginBottom={20}
            />
            {selectedFields.map((field, index) => {
              return (
                <FieldContainer>
                  <div style={{ width: '200px' }}>
                    <Select
                      value={field.fieldTypeId}
                      onChange={(e) =>
                        onFormFieldChange('fieldTypeId', +e.target.value, index)
                      }
                    >
                      {fieldTypeContext.map((x) => (
                        <option value={x.id}>{`${x.code} - ${x.name}`}</option>
                      ))}
                    </Select>
                  </div>
                  <TextInput
                    width={100}
                    value={field.code}
                    placeholder={language.formCreator.code}
                    onChange={(e) =>
                      onFormFieldChange('code', e.target.value, index)
                    }
                  />
                  <TextInput
                    value={field.name}
                    placeholder={language.formCreator.name}
                    onChange={(e) =>
                      onFormFieldChange('name', e.target.value, index)
                    }
                  />
                  <TextInput
                    width={50}
                    type='number'
                    value={field.minLength}
                    placeholder={language.formCreator.minLen}
                    onChange={(e) =>
                      onFormFieldChange('minLength', +e.target.value, index)
                    }
                  />
                  <TextInput
                    width={50}
                    type='number'
                    value={field.maxLength}
                    placeholder={language.formCreator.maxLen}
                    onChange={(e) =>
                      onFormFieldChange('maxLength', +e.target.value, index)
                    }
                  />
                  <Switch
                    height={20}
                    checked={field.required}
                    placeholder={language.formCreator.required}
                    onChange={(e) =>
                      onFormFieldChange('required', e.target.checked, index)
                    }
                  />
                  <Switch
                    height={20}
                    checked={field.uppercase}
                    placeholder={language.formCreator.uppercase}
                    onChange={(e) =>
                      onFormFieldChange('uppercase', e.target.checked, index)
                    }
                  />
                  {!field.id && (
                    <IconButton
                      icon={TrashIcon}
                      intent='danger'
                      height={40}
                      onClick={() => newFields(index)}
                    />
                  )}
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
        {language.formTitle}
      </Button>
    </Pane>
  )
}
