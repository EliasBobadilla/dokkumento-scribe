import { UserDto, RoleDto, UserRequestDto } from '../dtos/management'
import {
  FieldTypeDto,
  FormDto,
  FormFieldDto,
  ProjectDto,
  SubmitFormDto,
} from '../dtos/documents'

export const getAuth = (model: UserRequestDto) =>
  window.electron.ipc.invoke<UserDto | undefined>('getAuth', model)

export const getRoles = () =>
  window.electron.ipc.invoke<RoleDto[]>('getRoles', null)

export const getFieldTypes = () =>
  window.electron.ipc.invoke<FieldTypeDto[]>('getFieldTypes', null)

export const getProjects = () =>
  window.electron.ipc.invoke<ProjectDto[]>('getProjects', null)

export const getFormFields = (projectId: number) =>
  window.electron.ipc.invoke<FormFieldDto[]>('getFormFields', projectId)

export const getForms = (projectId: number) =>
  window.electron.ipc.invoke<FormDto[]>('getForms', projectId)

export const submitForm = async (model: SubmitFormDto) =>
  window.electron.ipc.invoke<FieldTypeDto[]>('saveForm', model)

export const upsertProject = async (model: ProjectDto) =>
  window.electron.ipc.invoke<ProjectDto>('upsertProject', model)

export const upsertForm = async (model: FormDto) =>
  window.electron.ipc.invoke<FormDto>('upsertForm', model)

export const upsertFormFields = async (model: FormDto) =>
  window.electron.ipc.invoke<FormFieldDto[]>('upsertFormFields', model)

export const upsertField = async (model: SubmitFormDto) =>
  window.electron.ipc.invoke<FieldTypeDto[]>('upsertField', model)
