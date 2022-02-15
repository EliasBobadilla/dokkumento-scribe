import type { ProjectModel } from '../models/projects'

export type ProjectAction = { type: 'set'; payload: ProjectModel[] }

export const projectDefaultState: ProjectModel[] = []

export function projectReducer(state: ProjectModel[], action: ProjectAction) {
  switch (action.type) {
    case 'set': {
      return action.payload
    }
    default:
      return state
  }
}
