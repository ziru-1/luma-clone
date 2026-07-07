export enum Role {
  Guest = 'GUEST',
  Staff = 'STAFF',
  Host = 'HOST',
}

export interface UserDto {
  id: string
  email: string
  name: string | null
  avatarUrl: string | null
  role: Role
}
