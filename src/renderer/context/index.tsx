import { createContext, ReactNode, useContext, useReducer } from 'react'
import { userDefaultState, usersReducer } from './usersReducer'
import { rolesDefaultState, rolesReducer } from './rolesReducer'
import { fieldTypeReducer, fieldTypesDefaultState } from './fieldTypesReducer'
import { formsDefaultState, formsReducer } from './formsReducer'
import { projectsDefaultState, projectsReducer } from './projectsReducer'
import { formFieldsDefaultState, formFieldsReducer } from './FormFieldsReducer'
import {
  FieldTypeDto,
  FormDto,
  FormFieldDto,
  ProjectDto,
} from '../dtos/documents'
import { Language, languages } from '../components/languages'
import { RoleDto, UserDto } from '../dtos/management'

type ContextType = {
  language: Language
  userContext: UserDto
  roleContext: RoleDto[]
  fieldTypeContext: FieldTypeDto[]
  projectContext: ProjectDto[]
  formContext: FormDto[]
  formFieldContext: FormFieldDto[]
  setUserContext: (model: UserDto) => void
  setRoleContext: (model: RoleDto[]) => void
  setFieldTypeContext: (model: FieldTypeDto[]) => void
  setFormContext: (model: FormDto[]) => void
  setFormFieldContext: (model: FormFieldDto[]) => void
  setProjectContext: (model: ProjectDto[]) => void
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
        setUserContext,
        setRoleContext,
        setFieldTypeContext,
        setFormContext,
        setFormFieldContext,
        setProjectContext,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
