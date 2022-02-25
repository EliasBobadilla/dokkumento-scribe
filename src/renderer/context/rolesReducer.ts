import { RoleDto } from '../dtos/management'

export type RoleAction = { type: 'set-roles'; payload: RoleDto[] }

export const rolesDefaultState = []

export function rolesReducer(state: RoleDto[], action: RoleAction) {
  switch (action.type) {
    case 'set-roles': {
      if (!action.payload) return state
      return action.payload
    }
    default:
      return state
  }
}
