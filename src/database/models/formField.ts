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

  declare order: number

  declare code: string

  declare name: string

  declare minLength: number

  declare maxLength: number

  declare uppercase: boolean

  declare datasource: string

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
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Order',
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
    minLength: {
      type: DataTypes.INTEGER,
      field: 'MinLength',
    },
    maxLength: {
      type: DataTypes.INTEGER,
      field: 'MaxLength',
    },
    required: {
      type: DataTypes.BOOLEAN,
      field: 'Required',
    },
    uppercase: {
      type: DataTypes.BOOLEAN,
      field: 'Uppercase',
    },
    datasource: {
      type: DataTypes.STRING,
      field: 'Datasource',
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      field: 'Deleted',
    },
  },
  {
    tableName: 'FormFields',
    timestamps: false,
    sequelize: db(),
  },
)
