/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { Button } from 'evergreen-ui'
import { useAppContext } from '../context'
import { FieldTypeModel } from '../models/fieldTypes'
import { ProjectModel } from '../models/projects'
import { FormModel, FormFieldModel, CurrentFormModel } from '../models/form'

interface Props {
  selectedProjectId: number
  setSelectedProjectId: (value: number) => void
  selectedFormId: number
  setSelectedFormId: (value: number) => void
}

const Header = ({
  selectedProjectId,
  setSelectedProjectId,
  selectedFormId,
  setSelectedFormId,
}: Props) => {
  const {
    userContext,
    roleContext,
    setFieldTypeContext,
    setFormContext,
    setProjectContext,
  } = useAppContext()

  const changeProject = () => {
    setSelectedProjectId(1)
  }

  const changeForm = () => {
    setSelectedFormId(1)
  }

  useEffect(() => {
    ;(async () => {
      const fieldTypes = await window.electron.ipc.invoke<FieldTypeModel[]>(
        'getFieldTypes',
        null,
      )
      const projects = await window.electron.ipc.invoke<ProjectModel[]>(
        'getProjects',
        null,
      )
      setFieldTypeContext(fieldTypes)
      setProjectContext(projects)
    })()
  }, [])

  useEffect(() => {
    if (!selectedProjectId) return
    const request = { projectId: selectedProjectId }
    ;(async () => {
      const formFields = await window.electron.ipc.invoke<FormFieldModel[]>(
        'getFormFields',
        request,
      )
      const forms = await window.electron.ipc.invoke<FormModel[]>(
        'getForms',
        request,
      )
      const currentForms: CurrentFormModel = {
        Forms: forms,
        FormFields: formFields,
      }
      setFormContext(currentForms)
    })()
  }, [selectedProjectId])

  return (
    <div>
      <p>{`Hola ${userContext.Firstname} ${userContext.Lastname}`}</p>
      <p>{roleContext.Name}</p>
      <Button onClick={changeProject}>seleccionar proyecto</Button>
      <Button onClick={changeForm}>seleccionar formulario</Button>
    </div>
  )
}

export default Header
