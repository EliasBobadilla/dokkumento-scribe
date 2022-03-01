import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from './db'

export default class Form extends Model<
  InferAttributes<Form>,
  InferCreationAttributes<Form>
> {
  declare id: number

  declare projectId: number

  declare code: string

  declare name: string

  declare description: string

  declare deleted: boolean
}

Form.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'Id',
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'ProjectId',
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'Code',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'Name',
    },
    description: {
      type: DataTypes.STRING,
      field: 'Description',
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      field: 'Deleted',
    },
  },
  {
    tableName: 'Forms',
    timestamps: false,
    sequelize: db(),
  },
)
