import { initialPagination, IPagination } from "app/shared/paginator.traslate"
import { ISort } from "app/utils/util.types"
import { IBuilding } from "../building/building.types"

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
    buildings: number[]
}

export const initialStateUser: IUser = {
    id: 1,
    name: 'string',
    email: 'string',
    roles: [1],
    celular: '',
    reset_password: true,
    password: '',
    buildings: []
}

export interface IRoles {
    rol_id: number
    name: string
}

export interface IRequirementUser {
    roles: IRoles[]
    buildings: IBuilding[]
}

export interface ModalUserProp {
    edit: boolean
    user_id: number
    name: string
}
