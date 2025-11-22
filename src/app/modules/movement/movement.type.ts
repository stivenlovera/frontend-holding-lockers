import { initialPagination, IPagination } from "app/shared/paginator.traslate"
import { ISort } from "app/utils/util.types"
import { ILocker, initialStateLocker } from "../locker/locker.types"


export interface IDataTableMovement {
    paginate: IPagination
    movements: IListMovement[]
    locker: ILocker
    sort: ISort
}

export const initialStateDataTableMovement: IDataTableMovement = {
    paginate: initialPagination,
    sort: {
        active: "create_at",
        direction: "asc"
    },
    movements: [],
    locker: initialStateLocker
}

export interface Paginate {
    length: number
    pageIndex: number
    pageSize: number
}

export interface IListMovement {
    movement_id: number
    department: string
    casillero: number
    code: string
    id_ref: string
    status_integrate: string
    status_notificate: number
    state: string
    create_at: string
}

export interface IActivity {
    departament: string
    door: string
    id_ref: string
    status_integrate: number
    status_notificate: number
    type_movement: string
    create_at: string
}
export const initialStateActivity: IActivity = {
    departament: "",
    door: "",
    id_ref: "",
    status_integrate: 0,
    status_notificate: 0,
    type_movement: "",
    create_at: ""
}
export interface IDetailedActivity {
    entrada: IActivity | null
    salida: IActivity | null
}
export const initialStateDetailedActivity: IDetailedActivity = {
    entrada: initialStateActivity,
    salida: initialStateActivity
}
