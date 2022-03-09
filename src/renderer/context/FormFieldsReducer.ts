import { FormFieldDto } from '../../dtos/formField'

type FormAction = { type: 'set-formFields'; payload: FormFieldDto[] }

export const formFieldsDefaultState: FormFieldDto[] = []

export function formFieldsReducer(state: FormFieldDto[], action: FormAction) {
  switch (action.type) {
    case 'set-formFields':
      return action.payload
    default:
      return state
  }
}
