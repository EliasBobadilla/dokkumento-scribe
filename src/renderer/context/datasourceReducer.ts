import { DataSourceDto } from '../dtos/documents'

type DatasourceAction = {
  type: 'set-datasource'
  payload: DataSourceDto
}

export const datasourceDefaultState: DataSourceDto = {
  TD_NAMES: [],
  TD_SEDES: [],
}

export function datasourceReducer(
  state: DataSourceDto,
  action: DatasourceAction,
) {
  switch (action.type) {
    case 'set-datasource': {
      return action.payload
    }
    default:
      return state
  }
}
