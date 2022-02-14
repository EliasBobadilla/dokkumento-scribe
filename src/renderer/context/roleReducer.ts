import type { RoleModel } from '../models/auth'

export type RoleAction = { type: 'login' | 'logout'; payload?: RoleModel }

export const roleDefaultState: RoleModel = {
  Id: 0,
  Name: '',
  Description: '',
}

export function roleReducer(state: RoleModel, action: RoleAction) {
  switch (action.type) {
    case 'login': {
      if (!action.payload) return state
      return {
        Id: action.payload.Id,
        Name: action.payload.Name,
        Description: action.payload.Description,
      }
    }
    case 'logout': {
      return roleDefaultState
    }
    default:
      return state
  }
}
