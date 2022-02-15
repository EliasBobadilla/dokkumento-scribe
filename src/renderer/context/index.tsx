import { createContext, ReactNode, useContext, useReducer } from 'react'
import { userReducer, userDefaultState } from './userReducer'
import { roleReducer, roleDefaultState } from './roleReducer'
import { UserModel, RoleModel } from '../models/auth'
import { fieldTypeDefaultState, fieldTypeReducer } from './fieldTypesReducer'
import { formDefaultState, formReducer } from './formReducer'
import { projectDefaultState, projectReducer } from './projectReducer'
import { FieldTypeModel } from '../models/fieldTypes'
import { CurrentFormModel } from '../models/form'
import { ProjectModel } from '../models/projects'

type ContextType = {
  userContext: UserModel
  roleContext: RoleModel
  fieldTypeContext: FieldTypeModel[]
  projectContext: ProjectModel[]
  formContext: CurrentFormModel
  setUserContext: (model?: UserModel) => void
  setRoleContext: (model?: RoleModel) => void
  setFieldTypeContext: (model: FieldTypeModel[]) => void
  setFormContext: (model: CurrentFormModel) => void
  setProjectContext: (model: ProjectModel[]) => void
}

const AppContext = createContext<ContextType>({} as ContextType)

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useReducer(userReducer, userDefaultState)
  const [role, setRole] = useReducer(roleReducer, roleDefaultState)
  const [fieldType, setFieldType] = useReducer(
    fieldTypeReducer,
    fieldTypeDefaultState,
  )
  const [form, setForm] = useReducer(formReducer, formDefaultState)
  const [project, setProject] = useReducer(projectReducer, projectDefaultState)

  const setUserContext = (model?: UserModel) => {
    if (!model) setUser({ type: 'logout' })
    setUser({ type: 'login', payload: model })
  }

  const setRoleContext = (model?: RoleModel) => {
    if (!model) setRole({ type: 'logout' })
    setRole({ type: 'login', payload: model })
  }

  const setFieldTypeContext = (model: FieldTypeModel[]) => {
    setFieldType({ type: 'set', payload: model })
  }

  const setFormContext = (model: CurrentFormModel) => {
    setForm({ type: 'set', payload: model })
  }

  const setProjectContext = (model: ProjectModel[]) => {
    setProject({ type: 'set', payload: model })
  }

  return (
    <AppContext.Provider
      value={{
        userContext: user,
        roleContext: role,
        fieldTypeContext: fieldType,
        formContext: form,
        projectContext: project,
        setUserContext,
        setRoleContext,
        setFieldTypeContext,
        setFormContext,
        setProjectContext,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  return context
}
