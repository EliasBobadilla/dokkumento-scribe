import { useState } from 'react'
import {
  Button,
  Dialog,
  Pane,
  ProjectsIcon,
  Alert,
  toaster,
  TextInput,
  Select,
  IconButton,
  TrashIcon,
} from 'evergreen-ui'
import { FormDto, ProjectDto } from 'renderer/dtos/documents'
import { useAppContext } from '../../context'
import {
  upsertForm,
  deleteForm,
  getForms,
  getFormFields,
} from '../../helpers/db'
import { FormDataSection } from './styles'

const projectInitialState = { code: '', name: '' }
const formInitialState = { projectId: 0, code: '', name: '' }

export default () => {
  const {
    language,
    projectContext,
    setFormContext,
    formContext,
    setFormFieldContext,
  } = useAppContext()

  const [isShown, setIsShown] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectDto>(
    projectContext[0],
  )
  const [selectedForm, setSelectedForm] = useState<FormDto>({
    ...formInitialState,
  })

  const onSave = async () => {
    if (!selectedProject?.id) {
      toaster.danger(language.formManager.saveError)
      return
    }

    if (!selectedForm?.code || !selectedForm?.name) {
      toaster.danger(language.formManager.saveError)
      return
    }

    const response = await upsertForm({
      ...selectedForm,
      projectId: selectedProject.id,
    })

    const newContext = [...formContext]
    const index = newContext.findIndex((x) => x.id === response.id)
    if (index >= 0) newContext[index] = response
    else newContext.push(response)

    setFormContext(newContext)
    setSelectedForm({ ...formInitialState })
    setIsShown(!isShown)
  }

  const onDelete = async () => {
    if (!selectedForm?.id) return

    const result = await deleteForm(selectedForm.id)
    if (result) {
      const newContext = [...formContext]
      const index = newContext.findIndex((x) => x.id === selectedForm.id)
      newContext.splice(index, 1)

      setFormContext(newContext)
      setSelectedForm({ ...formInitialState })
      setIsShown(!isShown)
    }
  }

  const onProjectChange = async (id: number) => {
    setSelectedProject(
      projectContext.find((x) => x.id === id) || { ...projectInitialState },
    )
    const [forms, formFields] = await Promise.all([
      getForms(id),
      getFormFields(id),
    ])
    setFormContext(forms)
    setSelectedForm({ ...formInitialState })
    setFormFieldContext(formFields)
  }

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
            <Select
              height={40}
              width='100%'
              onChange={(e) => onProjectChange(+e.target.value)}
            >
              <option key='0' value={0}>
                {language.formManager.placeholder}
              </option>
              {projectContext.map((x) => (
                <option
                  key={x.id}
                  value={x.id}
                >{`${x.code} - ${x.name}`}</option>
              ))}
            </Select>
            <Alert
              intent='none'
              title={language.formManager.alert}
              marginTop={20}
              marginBottom={20}
            />
            <FormDataSection>
              <Select
                height={40}
                value={selectedForm?.id}
                onChange={(e) =>
                  setSelectedForm(
                    formContext.find((x) => x.id === +e.target.value) || {
                      ...formInitialState,
                    },
                  )
                }
              >
                <option key='0' value={0}>
                  {language.formManager.placeholder}
                </option>
                {formContext.map((x) => (
                  <option
                    key={x.id}
                    value={x.id}
                  >{`${x.code} - ${x.name}`}</option>
                ))}
              </Select>
              <TextInput
                height={40}
                value={selectedForm?.code}
                placeholder={language.formManager.code}
                onChange={(e) =>
                  setSelectedForm({
                    ...selectedForm,
                    code: e.target.value,
                  } as FormDto)
                }
              />
              <TextInput
                height={40}
                value={selectedForm?.name}
                placeholder={language.formManager.name}
                onChange={(e) =>
                  setSelectedForm({
                    ...selectedForm,
                    name: e.target.value,
                  } as FormDto)
                }
              />
              <IconButton
                icon={TrashIcon}
                intent='danger'
                height={40}
                onClick={() => onDelete()}
              />
            </FormDataSection>
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
