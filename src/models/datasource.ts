import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { db } from '../database/db'

export default class Datasource extends Model<
  InferAttributes<Datasource>,
  InferCreationAttributes<Datasource>
> {
  declare id: number

  declare source: string
}

Datasource.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'Id',
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'Source',
    },
  },
  {
    tableName: 'DataSources',
    timestamps: false,
    sequelize: db(),
  },
)
