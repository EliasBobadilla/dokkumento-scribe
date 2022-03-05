import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from './db'

export default class Datasource extends Model<
  InferAttributes<Datasource>,
  InferCreationAttributes<Datasource>
> {
  declare id: number

  declare name: string
}

Datasource.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'Id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'Name',
    },
  },
  {
    tableName: 'DataSources',
    timestamps: false,
    sequelize: db(),
  },
)
