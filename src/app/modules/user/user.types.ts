import { initialPagination, IPagination } from "app/shared/paginator.traslate"
import { ISort } from "app/utils/util.types"

export interface IListUser {
    id: number
    name: string
    email: string
    celular: string
    roles: string
}

export interface IDataTableUser {
    paginate: IPagination
    users: IListUser[]
    sort: ISort
}

export const initialStateDataTableUser: IDataTableUser = {
    paginate: initialPagination,
    sort: {
        active: "id",
        direction: "asc"
    },
    users: []
}

export interface IUser {
    id: number
    name: string
    email: string
    roles: number[]
    celular: string
    reset_password: boolean
    password: string
}

export const initialStateUser: IUser = {
    id: 1,
    name: 'string',
    email: 'string',
    roles: [],
    celular: '',
    reset_password: true,
    password: ''
}

export interface IRoles {
    rol_id: number
    name: string
}

export interface IRequirementUser {
    roles: IRoles[]
}

export interface ModalUserProp {
    edit: boolean
    user_id: number
    name: string
}
