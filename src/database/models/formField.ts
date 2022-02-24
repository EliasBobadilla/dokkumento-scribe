import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from './db'

export default class FormField extends Model<
  InferAttributes<FormField>,
  InferCreationAttributes<FormField>
> {
  declare id: number

  declare projectId: number

  declare formId: number

  declare fieldTypeId: number

  declare code: string

  declare name: string

  declare description: string

  declare minLength: number

  declare maxLength: number

  declare uppercase: boolean

  declare required: boolean

  declare deleted: boolean
}

FormField.init(
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
    formId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'FormId',
    },
    fieldTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'FieldTypeId',
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
      allowNull: false,
      field: 'Description',
    },
    minLength: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'MinLength',
    },
    maxLength: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'MaxLength',
    },
    required: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'Required',
    },
    uppercase: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'Uppercase',
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'Deleted',
    },
  },
  {
    tableName: 'FormFields',
    timestamps: false,
    sequelize: db(),
  },
)
