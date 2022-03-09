import { UserDto } from '../../dtos/user'

type UserAction = { type: 'set-user'; payload: UserDto }

export const userDefaultState: UserDto = {
  id: 0,
  roleId: 0,
  firstname: '',
  lastname: '',
  username: '',
  password: '',
}

export function usersReducer(state: UserDto, action: UserAction) {
  switch (action.type) {
    case 'set-user': {
      return action.payload
    }
    default:
      return state
  }
}
