import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { db } from '../database/db'

export default class Form extends Model<
  InferAttributes<Form>,
  InferCreationAttributes<Form>
> {
  declare id: number

  declare projectId: number

  declare code: string

  declare name: string

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
