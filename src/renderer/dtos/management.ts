export interface UserDto {
  id: number
  roleId: number
  firstname: string
  lastname: string
  username: string
  password: string
}

export interface RoleDto {
  id: number
  code: string
  name: string
}

export interface UserRequestDto {
  username: string
  password: string
}

export enum Roles {
  TYPIST = 'TYPIST',
  ADMIN = 'ADMIN',
  SYS_ADMIN = 'SYS_ADMIN',
}
