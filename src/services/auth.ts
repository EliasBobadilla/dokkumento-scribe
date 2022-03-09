import User from '../models/user'
import Role from '../models/role'
import { ErrorHandler } from './helpers'
import { UserRequestDto } from '../dtos/general'

export const getAuth = async (props: UserRequestDto) => {
  try {
    const { username, password } = props

    const data = await User.findAll({
      limit: 1,
      raw: true,
      where: {
        username,
        password,
      },
    })

    if (data.length === 0)
      return ErrorHandler(
        new Error(
          `authentication error, no user found with '${username}', '${password}' requested data`,
        ),
        true,
      )

    return data[0]
  } catch (error) {
    return ErrorHandler(error)
  }
}

export const getRoles = () =>
  Role.findAll({
    raw: true,
  })
