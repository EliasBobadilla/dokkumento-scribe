import type { RoleModel } from '../models/auth'

export type RoleAction = { type: 'login' | 'logout'; payload?: RoleModel }

export const roleDefaultState: RoleModel = {
  Id: 0,
  Name: '',
  Code: '',
}

export function roleReducer(state: RoleModel, action: RoleAction) {
  switch (action.type) {
    case 'login': {
      if (!action.payload) return state
      return action.payload
    }
    case 'logout': {
      return roleDefaultState
    }
    default:
      return state
  }
}
