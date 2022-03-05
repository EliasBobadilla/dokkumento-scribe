import { FormDto } from '../dtos/documents'

type FormAction = { type: 'set-forms'; payload: FormDto[] }

export const formsDefaultState: FormDto[] = []

export function formsReducer(state: FormDto[], action: FormAction) {
  switch (action.type) {
    case 'set-forms':
      return action.payload
    default:
      return state
  }
}
