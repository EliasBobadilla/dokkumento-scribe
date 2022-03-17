import { RoleDto } from '../../dtos/role'
import { UserDto } from '../../dtos/user'
import { SubmitFormDto } from '../../dtos/general'
import { DataSourceDto } from '../../dtos/datasource'
import { FieldTypeDto } from '../../dtos/fieldType'
import { FormFieldDto } from '../../dtos/formField'
import { FormDto } from '../../dtos/form'
import { ProjectDto } from '../../dtos/project'
import { SettingsDto } from 'dtos/settings'

export const getAuth = (model: { username: string; password: string }) =>
  window.electron.ipc.invoke<UserDto | undefined>('getAuth', model)

export const getRoles = () => window.electron.ipc.invoke<RoleDto[]>('getRoles')

export const getFieldTypes = () =>
  window.electron.ipc.invoke<FieldTypeDto[]>('getFieldTypes')

export const getProjects = () =>
  window.electron.ipc.invoke<ProjectDto[]>('getProjects')

export const getFormFields = () =>
  window.electron.ipc.invoke<FormFieldDto[]>('getFormFields')

export const getForms = () => window.electron.ipc.invoke<FormDto[]>('getForms')

export const submitForm = (model: SubmitFormDto) =>
  window.electron.ipc.invoke<FieldTypeDto[]>('saveForm', model)

export const upsertProject = (model: ProjectDto) =>
  window.electron.ipc.invoke<ProjectDto>('upsertProject', model)

export const upsertForm = (model: FormDto) =>
  window.electron.ipc.invoke<FormDto>('upsertForm', model)

export const deleteProject = (id: number) =>
  window.electron.ipc.invoke<ProjectDto>('deleteProject', id)

export const deleteForm = (id: number) =>
  window.electron.ipc.invoke<ProjectDto>('deleteForm', id)

export const upsertFormFields = (model: FormFieldDto[]) =>
  window.electron.ipc.invoke<FormFieldDto[]>('upsertFormFields', model)

export const getDataSource = () =>
  window.electron.ipc.invoke<DataSourceDto>('getDataSource')

export const getDataFromDigTable = (model: {
  table: string
  fields: string[]
  filter: { field: string; value: string }
}) => window.electron.ipc.invoke<any[]>('getDataFromDigTable', model)

export const getSettings = () =>
  window.electron.ipc.invoke<SettingsDto>('getSettings')

export const getDbValidation = (model: string) =>
  window.electron.ipc.invoke<{ COUNT: number }[]>('getDbValidation', model)
