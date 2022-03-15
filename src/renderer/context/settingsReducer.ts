import { SettingsDto } from '../../dtos/settings'

type SettingsAction = { type: 'set-settings'; payload: SettingsDto }

export const settingsDefaultState = {
  dateFieldId: 0,
}

export function settingsReducer(state: SettingsDto, action: SettingsAction) {
  switch (action.type) {
    case 'set-settings': {
      if (!action.payload) return state
      return action.payload
    }
    default:
      return state
  }
}
