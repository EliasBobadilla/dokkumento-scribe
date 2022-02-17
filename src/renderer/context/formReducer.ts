import { CurrentFormModel } from '../models/form'

export type FormAction = { type: 'set'; payload: CurrentFormModel }

export const formDefaultState: CurrentFormModel = {
  Forms: [],
  FormFields: [],
}

export function formReducer(state: CurrentFormModel, action: FormAction) {
  switch (action.type) {
    case 'set':
      return action.payload
    default:
      return state
  }
}
