import { initialPagination, IPagination } from "app/shared/paginator.traslate"
import { ISort } from "app/utils/util.types"
import { IController } from "../locker/locker.types"

export interface IDoor {
    door_id: number
    door_size_id: number
    controller_id: number
    name: string
    order: number
    state: number
    create_at: string
}

export const initialStateDoor: IDoor = {
    door_id: -1,
    door_size_id: -1,
    controller_id: -1,
    name: "",
    state: -1,
    order: -1,
    create_at: ""
}

export const initialStateDataTableDoor: IDataTableDoor = {
    paginate: {
        ...initialPagination,
        pageSize: 100
    },
    sort: {
        active: "create_at",
        direction: "asc"
    },
    doors: []
}

export interface IListDoor {
    door_id: number
    door_size_name: string
    controller_name: string
    name: string
    order: number
    state: string
    create_at: string
}

export interface IDataTableDoor {
    paginate: IPagination
    doors: IListDoor[]
    sort: ISort
}

export interface ModalDoorProp {
    edit: boolean
    door_id: number
    locker_id: number
    name: string
}

export interface ISizeDoor {
    door_size_id: number
    name: string
}

export interface RequerimentsProp {
    door_sizes: ISizeDoor[]
    controllers: IController[]
}