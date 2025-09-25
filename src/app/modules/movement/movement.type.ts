import { initialPagination, IPagination } from "app/shared/paginator.traslate"
import { ISort } from "app/utils/util.types"


export interface IDataTableMovement {
    paginate: IPagination
    movements: IListMovement[]
    sort: ISort
}

export const initialStateDataTableMovement: IDataTableMovement = {
    paginate: initialPagination,
    sort: {
        active: "create_at",
        direction: "asc"
    },
    movements: []
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
    status_integrate: number
    status_notificate: number
    state: string
    create_at: string
}