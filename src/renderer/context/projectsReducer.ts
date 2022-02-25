import type { ProjectDto } from '../dtos/documents'

export type ProjectAction = { type: 'set-projects'; payload: ProjectDto[] }

export const projectsDefaultState: ProjectDto[] = []

export function projectsReducer(state: ProjectDto[], action: ProjectAction) {
  switch (action.type) {
    case 'set-projects': {
      return action.payload
    }
    default:
      return state
  }
}
