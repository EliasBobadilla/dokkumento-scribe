/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import TypistModule from '../components/TypistModule'
import AdminModule from '../components/AdminModule'
import CoordinatorModule from '../components/CoordinatoModule'
import { useAppContext } from '../context'
import Header from '../components/Header'
import {
  getDataSource,
  getFieldTypes,
  getFormFields,
  getForms,
  getProjects,
  getSettings,
} from '../helpers/db'

const Main = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(0)
  const [selectedFormId, setSelectedFormId] = useState(0)
  const [module, setModule] = useState<string>('TYPIST')

  const {
    userContext,
    roleContext,
    setFieldTypeContext,
    setFormContext,
    setFormFieldContext,
    setProjectContext,
    setDatasourceContext,
    setSettingsContext,
  } = useAppContext()
  const role = roleContext.find((r) => r.id === userContext.roleId)
  const [tag, setTag] = useState<string>('')

  useEffect(() => {
    ;(async () => {
      const [fieldTypes, projects, forms, formFields, datasource, settings] =
        await Promise.all([
          getFieldTypes(),
          getProjects(),
          getForms(),
          getFormFields(),
          getDataSource(),
          getSettings(),
        ])
      setFieldTypeContext(fieldTypes)
      setProjectContext(projects)
      setFormContext(forms)
      setFormFieldContext(formFields)
      setDatasourceContext(datasource)
      setSettingsContext(settings)
    })()
  }, [])

  return (
    <>
      <Header
        selectedProjectId={selectedProjectId}
        setSelectedProjectId={setSelectedProjectId}
        selectedFormId={selectedFormId}
        setSelectedFormId={setSelectedFormId}
        currentRole={role}
        tag={tag}
        setTag={setTag}
        setModule={setModule}
        module={module}
      />
      {module === 'TYPIST' && selectedProjectId > 0 && selectedFormId > 0 && (
        <TypistModule
          projectId={selectedProjectId}
          formId={selectedFormId}
          tag={tag}
        />
      )}
      {module === 'ADMIN' && <CoordinatorModule />}
      {module === 'SYS_ADMIN' && <AdminModule />}
    </>
  )
}

export default Main
