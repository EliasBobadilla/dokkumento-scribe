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
} from 'evergreen-ui'
import { ProjectDto } from 'renderer/dtos/documents'
import { useAppContext } from '../../context'
import { upsertProject } from '../../helpers/db'

const initialState: ProjectDto = {
  code: '',
  name: '',
}

export default () => {
  const [isShown, setIsShown] = useState(false)
  const [current, setCurrent] = useState<ProjectDto>(initialState)

  const { projectContext, setProjectContext } = useAppContext()

  const onProjectChange = (selectedProject: string) => {
    const code = selectedProject.split('-')[0].trim()
    const p = projectContext.find((x) => x.code === code)
    setCurrent(p!)
  }

  const onSave = async () => {
    if (!current.name || !current.code) {
      return // TODO: lanzar error
    }
    const upperedCode = current.code.toUpperCase()
    const response = await upsertProject({ ...current, code: upperedCode })

    if (response) {
      const newContext = [...projectContext]
      const index = newContext.findIndex((x) => x.id === response.id)
      if (index >= 0) newContext[index] = response
      else newContext.push(response)

      setProjectContext(newContext)
      setCurrent(initialState)
      setIsShown(!isShown)
    }

    //TODO: lanzar error
  }

  const onDelete = () => {}

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        width='90%'
        title='Administrador de proyectos'
        confirmLabel='Guardar'
        hasCancel
        onCancel={() => setIsShown(!isShown)}
        onConfirm={() => onSave()}
      >
        {({ close }) => (
          <Pane>
            <div>
              <Combobox
                openOnFocus
                width='100%'
                height={40}
                items={projectContext.map((p) => `${p.code} - ${p.name}`)}
                onChange={(selected) => onProjectChange(selected)}
                placeholder='Seleccione un proyecto'
              />
              <IconButton icon={TrashIcon} intent='danger' />
            </div>
            <Alert
              intent='none'
              title='El codigo del formulario debe ser  unico xq sera utilizado en el nombre de la tabla en la base de datos'
              marginTop={20}
              marginBottom={20}
            />

            <TextInputField
              label='Codigo del proyecto'
              required
              value={current?.code}
              onChange={(e: any) =>
                setCurrent({ ...current, code: e.target.value })
              }
              validationMessage='El codigo es obligatorio'
            />
            <TextInputField
              label='Nombre del proyecto'
              required
              value={current?.name}
              onChange={(e: any) =>
                setCurrent({ ...current, name: e.target.value })
              }
              validationMessage='El nombre es obligatorio'
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
        Administrar Proyectos
      </Button>
    </Pane>
  )
}
