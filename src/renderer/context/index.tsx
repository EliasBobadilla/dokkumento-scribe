import { createContext, ReactNode, useContext, useReducer } from 'react'
import { userDefaultState, usersReducer } from './usersReducer'
import { rolesDefaultState, rolesReducer } from './rolesReducer'
import { fieldTypeReducer, fieldTypesDefaultState } from './fieldTypesReducer'
import { formsDefaultState, formsReducer } from './formsReducer'
import { projectsDefaultState, projectsReducer } from './projectsReducer'
import { formFieldsDefaultState, formFieldsReducer } from './FormFieldsReducer'
import { datasourceDefaultState, datasourceReducer } from './datasourceReducer'
import { DataSourceDto } from '../../dtos/datasource'
import { FieldTypeDto } from '../../dtos/fieldType'
import { FormDto } from '../../dtos/form'
import { FormFieldDto } from '../../dtos/formField'
import { ProjectDto } from '../../dtos/project'
import { RoleDto } from '../../dtos/role'
import { UserDto } from '../../dtos/user'
import { SettingsDto } from '../../dtos/settings'
import { Language, languages } from '../helpers/languages'
import { settingsDefaultState, settingsReducer } from './settingsReducer'

type ContextType = {
  language: Language
  userContext: UserDto
  roleContext: RoleDto[]
  fieldTypeContext: FieldTypeDto[]
  projectContext: ProjectDto[]
  formContext: FormDto[]
  formFieldContext: FormFieldDto[]
  datasourceContext: DataSourceDto
  settingsContext: SettingsDto
  setUserContext: (model: UserDto) => void
  setRoleContext: (model: RoleDto[]) => void
  setFieldTypeContext: (model: FieldTypeDto[]) => void
  setFormContext: (model: FormDto[]) => void
  setFormFieldContext: (model: FormFieldDto[]) => void
  setProjectContext: (model: ProjectDto[]) => void
  setDatasourceContext: (model: DataSourceDto) => void
  setSettingsContext: (model: SettingsDto) => void
}

const AppContext = createContext<ContextType>({} as ContextType)

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useReducer(usersReducer, userDefaultState)
  const [role, setRole] = useReducer(rolesReducer, rolesDefaultState)
  const [fieldType, setFieldType] = useReducer(
    fieldTypeReducer,
    fieldTypesDefaultState,
  )
  const [form, setForm] = useReducer(formsReducer, formsDefaultState)
  const [formField, setFormField] = useReducer(
    formFieldsReducer,
    formFieldsDefaultState,
  )
  const [project, setProject] = useReducer(
    projectsReducer,
    projectsDefaultState,
  )

  const [datasource, setDatasource] = useReducer(
    datasourceReducer,
    datasourceDefaultState,
  )

  const [settings, setSettings] = useReducer(
    settingsReducer,
    settingsDefaultState,
  )

  const setUserContext = (model: UserDto) => {
    setUser({ type: 'set-user', payload: model })
  }

  const setRoleContext = (model: RoleDto[]) => {
    setRole({ type: 'set-roles', payload: model })
  }

  const setFieldTypeContext = (model: FieldTypeDto[]) => {
    setFieldType({ type: 'set-fieldTypes', payload: model })
  }

  const setFormContext = (model: FormDto[]) => {
    setForm({ type: 'set-forms', payload: model })
  }

  const setFormFieldContext = (model: FormFieldDto[]) => {
    setFormField({ type: 'set-formFields', payload: model })
  }

  const setProjectContext = (model: ProjectDto[]) => {
    setProject({ type: 'set-projects', payload: model })
  }

  const setDatasourceContext = (model: DataSourceDto) => {
    setDatasource({ type: 'set-datasource', payload: model })
  }

  const setSettingsContext = (model: SettingsDto) => {
    setSettings({ type: 'set-settings', payload: model })
  }

  return (
    <AppContext.Provider
      value={{
        language: languages.spanish,
        userContext: user,
        roleContext: role,
        fieldTypeContext: fieldType,
        formContext: form,
        formFieldContext: formField,
        projectContext: project,
        datasourceContext: datasource,
        settingsContext: settings,
        setUserContext,
        setRoleContext,
        setFieldTypeContext,
        setFormContext,
        setFormFieldContext,
        setProjectContext,
        setDatasourceContext,
        setSettingsContext,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
