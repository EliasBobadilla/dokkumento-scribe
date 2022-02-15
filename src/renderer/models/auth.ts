export type UserModel = {
  Id: number
  Firstname: string
  Lastname: string
  Username: string
  Password: string
}

export type RoleModel = {
  Id: number
  Name: string
  Description: string
}

export enum Roles {
  TYPIST = 'TYPIST',
  ADMIN = 'ADMIN',
  SYS_ADMIN = 'SYS_ADMIN',
}

export interface AuthModel {
  User: UserModel
  Role: RoleModel
}
