export interface User
{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
}

export interface IUser {
  auth: Auth
  rol: Rol[]
}

export interface Auth {
  id: number
  name: string
  email: string
  email_verified_at: any
  created_at: any
  updated_at: any
}

export interface Rol {
  name: string
}
