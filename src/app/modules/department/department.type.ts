import { initialPagination, IPagination } from "app/shared/paginator.traslate"
import { ISort } from "app/utils/util.types"
import { ILocker, initialStateLocker } from "../locker/locker.types"

export interface IUser {
    user_id: number
    department_id: number
    name: string
    celular: string
    state: number,
    name_building: string
    name_department: string
}

export interface IDataTableUser {
    paginate: IPagination
    users: IUser[]
    locker: ILocker
    sort: ISort
}

export const initialStateDataTableUser: IDataTableUser = {
    paginate: initialPagination,
    sort: {
        active: "user_id",
        direction: "asc"
    },
    users: [],
    locker: initialStateLocker
}

export interface IListDepartament {
    department_id: number
    building_id: number
    name: string
    state: number
    users: IUser[],
    name_builder: string
}

export interface IDataTableDepartament {
    paginate: IPagination
    departments: IListDepartament[]
    locker: ILocker
    sort: ISort
}

export const initialStateDataTableDepartament: IDataTableDepartament = {
    paginate: initialPagination,
    sort: {
        active: "department_id",
        direction: "asc"
    },
    departments: [],
    locker: initialStateLocker
}