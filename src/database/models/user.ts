import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from './db'

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: number

  declare roleId: number

  declare firstname: string

  declare lastname: string

  declare username: string

  declare password: string

  declare deleted: boolean
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'Id',
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'RoleId',
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'Firstname',
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'Lastname',
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'Username',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'Password',
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'Deleted',
    },
  },
  {
    tableName: 'Users',
    timestamps: false,
    sequelize: db(),
  },
)
