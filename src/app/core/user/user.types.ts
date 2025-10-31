export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status?: string;
}

export interface Company {
  address: string;
  company_id: number;
  name: string;
  owner: string;
}

export interface IUser {
  auth: Auth
  rol: Rol[]
  company: Company
}

export interface Auth {
  id: number
  name: string
  email: string
  email_verified_at: any
  created_at: any
  updated_at: any
}
export const initialStateAuth: IUser = {
  auth: {
    id: 0,
    name: '',
    email: '',
    email_verified_at: undefined,
    created_at: undefined,
    updated_at: undefined
  },
  rol: [],
  company: {
    address: "",
    company_id: 0,
    name: "",
    owner: ""
  }
};

export interface Rol {
  name: string
}
