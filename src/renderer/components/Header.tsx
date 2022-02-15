/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Button } from 'evergreen-ui'
import { useAppContext } from '../context'
import { FieldTypeModel } from '../models/fieldTypes'
import { ProjectModel } from '../models/projects'
import { FormModel, FormFieldModel, CurrentFormModel } from '../models/form'

const Header = () => {
  const {
    userContext,
    roleContext,
    setFieldTypeContext,
    setFormContext,
    setProjectContext,
  } = useAppContext()
  const [selectedProjectId, setSelectedProjectId] = useState(1)

  const demo = () => {
    setSelectedProjectId(1)
  }
  useEffect(() => {
    ;(async () => {
      const fieldTypes = await window.electron.ipc.invoke<FieldTypeModel[]>(
        'getFieldTypes',
        null,
      )
      setFieldTypeContext(fieldTypes)

      const projects = await window.electron.ipc.invoke<ProjectModel[]>(
        'getProjects',
        null,
      )
      setProjectContext(projects)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const request = { projectId: selectedProjectId }
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
      <p>{roleContext.Description}</p>
      <Button onClick={demo} marginRight={16}>
        cambiar proyecto
      </Button>
    </div>
  )
}

export default Header
