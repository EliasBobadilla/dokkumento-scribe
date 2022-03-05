import { UserDto, RoleDto, UserRequestDto } from '../dtos/management'
import {
  DataSource,
  FieldTypeDto,
  FormDto,
  FormFieldDto,
  ProjectDto,
  SubmitFormDto,
} from '../dtos/documents'

export const getAuth = (model: UserRequestDto) =>
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
  window.electron.ipc.invoke<DataSource>('getDataSource')
