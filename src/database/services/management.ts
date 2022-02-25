import User from '../models/user'
import Role from '../models/role'
import { sqlSQLExceptionLogger } from '../models/db'

export const getAuth = async (
  props: any,
): Promise<User | undefined> => {
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
      return sqlSQLExceptionLogger(
        new Error(
          `authentication error, no user found with '${username}', '${password}' requested data`,
        ),
        true,
      )

    return data[0]
  } catch (error) {
    return sqlSQLExceptionLogger(error)
  }
}

export const getRoles = async (): Promise<Role[]> => {
  try {
    const data = await Role.findAll({
      raw: true,
    })

    if (data.length === 0)
      sqlSQLExceptionLogger(
        new Error(`No se encontraron roles disponibles en la base de datos`),
        true,
      )

    return data
  } catch (error) {
    sqlSQLExceptionLogger(error)
    return []
  }
}
