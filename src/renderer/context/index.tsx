import { createContext, ReactNode, useContext, useReducer } from 'react'
import { userReducer, userDefaultState } from './userReducer'
import { roleReducer, roleDefaultState } from './roleReducer'
import { UserModel, RoleModel } from '../models/auth'

type ContextType = {
  userContext: UserModel
  roleContext: RoleModel
  setUserContext: (user?: UserModel) => void
  setRoleContext: (role?: RoleModel) => void
}

const AppContext = createContext<ContextType>({} as ContextType)

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useReducer(userReducer, userDefaultState)
  const [role, setRole] = useReducer(roleReducer, roleDefaultState)

  const setUserContext = (model?: UserModel): UserModel => {
    if (!model) setUser({ type: 'logout' })
    setUser({ type: 'login', payload: model })
    return user
  }

  const setRoleContext = (model?: RoleModel): RoleModel => {
    if (!model) setRole({ type: 'logout' })
    setRole({ type: 'login', payload: role })
    return role
  }

  return (
    <AppContext.Provider
      value={{
        userContext: user,
        roleContext: role,
        setUserContext,
        setRoleContext,
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
