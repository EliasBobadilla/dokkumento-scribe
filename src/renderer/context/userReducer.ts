import type { UserModel } from '../models/auth'

export type UserAction = { type: 'login' | 'logout'; payload?: UserModel }

export const userDefaultState: UserModel = {
  Id: 0,
  Firstname: '',
  Lastname: '',
  Username: '',
  Password: '',
}

export function userReducer(state: UserModel, action: UserAction) {
  switch (action.type) {
    case 'login': {
      if (!action.payload) return state
      return {
        Id: action.payload.Id,
        Firstname: action.payload.Firstname,
        Lastname: action.payload.Lastname,
        Username: action.payload.Username,
        Password: action.payload.Password,
      }
    }
    case 'logout': {
      return userDefaultState
    }
    default:
      return state
  }
}
