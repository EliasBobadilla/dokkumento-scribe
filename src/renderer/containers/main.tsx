/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Roles } from '../dtos/management'
import TypistModule from '../components/TypistModule'
import AdminModule from '../components/AdminModule'
import CoordinatoModule from '../components/CoordinatoModule'
import { useAppContext } from '../context'
import Header from '../components/Header'
import {
  getFieldTypes,
  getFormFields,
  getForms,
  getProjects,
} from '../helpers/db'

const Main = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(0)
  const [selectedFormId, setSelectedFormId] = useState(0)
  const {
    userContext,
    roleContext,
    setFieldTypeContext,
    setFormContext,
    setFormFieldContext,
    setProjectContext,
  } = useAppContext()
  const role = roleContext.find((r) => r.id === userContext.roleId)
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    ;(async () => {
      const [fieldTypes, projects, forms, formFields] = await Promise.all([
        getFieldTypes(),
        getProjects(),
        getForms(),
        getFormFields(),
      ])
      setFieldTypeContext(fieldTypes)
      setProjectContext(projects)
      setFormContext(forms)
      setFormFieldContext(formFields)
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
        tags={tags}
        setTags={setTags}
      />
      {role?.code === Roles.TYPIST &&
        selectedProjectId > 0 &&
        selectedFormId > 0 && (
          <TypistModule
            projectId={selectedProjectId}
            formId={selectedFormId}
            tags={tags}
          />
        )}
      {role?.code === Roles.ADMIN && <CoordinatoModule />}
      {role?.code === Roles.SYS_ADMIN && <AdminModule />}
    </>
  )
}

export default Main
