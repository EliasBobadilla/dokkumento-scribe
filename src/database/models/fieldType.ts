import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from './db'

export default class FieldType extends Model<
  InferAttributes<FieldType>,
  InferCreationAttributes<FieldType>
> {
  declare id: number

  declare code: string

  declare name: string

  declare validationMessage: string

  declare pattern: string

  declare deleted: boolean
}

FieldType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'Id',
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
    validationMessage: {
      type: DataTypes.STRING,
      field: 'ValidationMessage',
    },
    pattern: {
      type: DataTypes.STRING,
      field: 'Pattern',
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'Deleted',
    },
  },
  {
    tableName: 'FieldTypes',
    timestamps: false,
    sequelize: db(),
  },
)
