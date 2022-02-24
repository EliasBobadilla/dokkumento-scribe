import type { FieldTypeDto } from '../dtos/documents'

export type FieldTypeAction = {
  type: 'set-fieldTypes'
  payload: FieldTypeDto[]
}

export const fieldTypesDefaultState: FieldTypeDto[] = []

export function fieldTypeReducer(
  state: FieldTypeDto[],
  action: FieldTypeAction,
) {
  switch (action.type) {
    case 'set-fieldTypes': {
      return action.payload
    }
    default:
      return state
  }
}
