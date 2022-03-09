export interface RoleDto {
  id: number
  code: string
  name: string
}

export enum RoleEnums {
  TYPIST = 'Digitador',
  ADMIN = 'Coordinador',
  SYS_ADMIN = 'Administrador',
}
