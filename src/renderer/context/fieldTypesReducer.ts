import type { FieldTypeModel } from '../models/fieldTypes'

export type FieldTypeAction = { type: 'set'; payload: FieldTypeModel[] }

export const fieldTypeDefaultState: FieldTypeModel[] = []

export function fieldTypeReducer(
  state: FieldTypeModel[],
  action: FieldTypeAction,
) {
  switch (action.type) {
    case 'set': {
      return action.payload
    }
    default:
      return state
  }
}
