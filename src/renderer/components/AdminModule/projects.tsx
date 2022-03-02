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
import { ProjectDto } from 'renderer/dtos/documents'
import { useAppContext } from '../../context'
import { upsertProject, deleteProject } from '../../helpers/db'
import { FormDataSection } from './styles'

const projectInitialState = { code: '', name: '' }

export default () => {
  const [isShown, setIsShown] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectDto>({
    ...projectInitialState,
  })

  const { language, projectContext, setProjectContext } = useAppContext()

  const onSave = async () => {
    if (!selectedProject?.code || !selectedProject?.name) {
      toaster.danger(language.projectManager.saveError)
      return
    }

    const response = await upsertProject(selectedProject)
    const newContext = [...projectContext]
    const index = newContext.findIndex((x) => x.id === response.id)
    if (index >= 0) newContext[index] = response
    else newContext.push(response)

    setProjectContext(newContext)
    setSelectedProject({ ...projectInitialState })
    setIsShown(!isShown)
  }

  const onDelete = async () => {
    if (!selectedProject?.id) return

    const result = await deleteProject(selectedProject.id)
    if (result) {
      const newContext = [...projectContext]
      const index = newContext.findIndex((x) => x.id === selectedProject.id)
      newContext.splice(index, 1)

      setProjectContext(newContext)
      setSelectedProject({ ...projectInitialState })
      setIsShown(!isShown)
    }
  }

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        width='95%'
        title={language.projectManager.title}
        confirmLabel={language.projectManager.save}
        hasCancel
        onCancel={() => setIsShown(!isShown)}
        onConfirm={() => onSave()}
      >
        {({ close }) => (
          <Pane>
            <Alert
              intent='none'
              title={language.projectManager.alert}
              marginTop={20}
              marginBottom={20}
            />
            <FormDataSection>
              <Select
                height={40}
                value={selectedProject?.id}
                onChange={(e) =>
                  setSelectedProject(
                    projectContext.find((x) => x.id === +e.target.value) || {
                      ...projectInitialState,
                    },
                  )
                }
              >
                <option key='0' value={0}>
                  {language.projectManager.placeholder}
                </option>
                {projectContext.map((x) => (
                  <option
                    key={x.id}
                    value={x.id}
                  >{`${x.code} - ${x.name}`}</option>
                ))}
              </Select>
              <TextInput
                height={40}
                value={selectedProject?.code}
                placeholder={language.projectManager.code}
                onChange={(e) =>
                  setSelectedProject({
                    ...selectedProject,
                    code: e.target.value,
                  } as ProjectDto)
                }
              />
              <TextInput
                height={40}
                value={selectedProject?.name}
                placeholder={language.projectManager.name}
                onChange={(e) =>
                  setSelectedProject({
                    ...selectedProject,
                    name: e.target.value,
                  } as ProjectDto)
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
        {language.projectManager.title}
      </Button>
    </Pane>
  )
}
