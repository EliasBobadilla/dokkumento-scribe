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

export interface AuthModel {
  User: UserModel
  Role: RoleModel
}
