import { useState } from 'react'
import {
  Button,
  Dialog,
  Pane,
  ProjectsIcon,
  Combobox,
  TextInputField,
  Alert,
  IconButton,
  TrashIcon,
  toaster,
} from 'evergreen-ui'
import { FormDto } from 'renderer/dtos/documents'
import { useAppContext } from '../../context'
import { upsertProject, deleteProject } from '../../helpers/db'
import { AdminComboBox } from './styles'

const initialState: FormDto = {
  code: '',
  name: '',
}

export default () => {
  const [isShown, setIsShown] = useState(false)
  const [current, setCurrent] = useState<ProjectDto>(initialState)

  const { language, projectContext, setProjectContext } = useAppContext()

  const onProjectChange = (selectedProject: string) => {
    const code = selectedProject.split('-')[0].trim()
    const p = projectContext.find((x) => x.code === code)
    setCurrent(p!)
  }

  const onSave = async () => {
    if (!current.name || !current.code) {
      toaster.danger(language.projectOnSaveError)
      return
    }
    const upperedCode = current.code.toUpperCase()
    const response = await upsertProject({ ...current, code: upperedCode })

    if (!response) {
      toaster.danger(language.projectOnSaveError)
      return
    }

    const newContext = [...projectContext]
    const index = newContext.findIndex((x) => x.id === response.id)
    if (index >= 0) newContext[index] = response
    else newContext.push(response)

    setProjectContext(newContext)
    setCurrent(initialState)
    setIsShown(!isShown)
  }

  const onDelete = async () => {
    if (!current.id) {
      toaster.danger(language.projectOnSaveError)
      return
    }
    const result = await deleteProject(current.id)
    if (result) {
      const newContext = [...projectContext]
      const index = newContext.findIndex((x) => x.id === current.id)
      newContext.splice(index, 1)

      setProjectContext(newContext)
      setCurrent(initialState)
      setIsShown(!isShown)
    }
  }

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        width='90%'
        title={language.projectMainTitle}
        confirmLabel={language.save}
        hasCancel
        onCancel={() => setIsShown(!isShown)}
        onConfirm={() => onSave()}
      >
        {({ close }) => (
          <Pane>
            <AdminComboBox>
              <Combobox
                openOnFocus
                width='98%'
                height={40}
                items={projectContext.map((p) => `${p.code} - ${p.name}`)}
                onChange={(selected) => onProjectChange(selected)}
                placeholder={language.projectButtonPlaceholder}
              />
              <IconButton
                icon={TrashIcon}
                intent='danger'
                height={40}
                onClick={() => onDelete()}
              />
            </AdminComboBox>
            <Alert
              intent='none'
              title={language.projectAlert}
              marginTop={20}
              marginBottom={20}
            />

            <TextInputField
              label={language.projectCodeLabel}
              required
              value={current?.code}
              onChange={(e: any) =>
                setCurrent({ ...current, code: e.target.value })
              }
              validationMessage={language.codeIsRequired}
            />
            <TextInputField
              label={language.projectNameLabel}
              required
              value={current?.name}
              onChange={(e: any) =>
                setCurrent({ ...current, name: e.target.value })
              }
              validationMessage={language.nameIsRequired}
            />
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
        {language.projectTitle}
      </Button>
    </Pane>
  )
}
