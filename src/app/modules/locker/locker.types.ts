import { initialPagination, IPagination } from "app/shared/paginator.traslate"
import { ISort } from "app/utils/util.types"

export interface ILockerProps {
    locker_id: number
    client_id: number
    macAdd: string
    address: string
    name: string
    state: number
    doors: IDoor[]
}

export interface IDoor {
    door_id: number
    door_size_id: number
    controller_id: number
    name: number
    name_size: string
    state: number
    create_at: string
    selected: boolean
}

export const sizeDoor = {
    large: 40,
    small: 10,
    medium: 20
}
export interface IColorDoor {
    available: string
    notAvailable: string
}
export const colorDoor: IColorDoor = {
    available: 'bg-green-200',
    notAvailable: 'bg-red-600'
}

export const inizializeStateLocker: ILockerProps = {
    locker_id: -1,
    client_id: -1,
    macAdd: "",
    address: "",
    name: "",
    state: -1,
    doors: []
}

export interface SelectedProp {
    index: number
    selected: boolean
}

export const initialStateSelected: SelectedProp = {
    index: -1,
    selected: false
}

export interface ResumelockerProp {
    available: number
    NoAvailable: number
    total: number
}

export const initializeStateResumelocker: ResumelockerProp = {
    available: 0,
    NoAvailable: 0,
    total: 0
}

export interface IDepartament {
    department_id: number
    client_id: number
    name: string
    state: number
    create_at?: string
    update_at?: string
}

export interface StatusInfoProp {
    locker: ILockerProps
    depataments: IDepartament[]
    movements: IMovement[]
}

export const inizializeStateStatusInfoProp: StatusInfoProp = {
    locker: {
        locker_id: 0,
        client_id: 0,
        macAdd: "",
        address: "",
        name: "",
        state: 0,
        doors: []
    },
    depataments: [],
    movements: []
}

export interface IMovement {
    movement_id: number
    door_id: number
    department_id: number
    client_id: number
    code: string
    type_movement_id: number
    id_ref: string
    status_notificate: number
    status_integrate: number
    create_at?: string
    update_at?: string
}

export interface ITypeMovement {
    type_locker_id: number
    name: string
    description: string
    create_at?: string
}

export const initializeStateTypelocker: ITypeMovement[] = [
    {
        type_locker_id: 1,
        name: "x2 vertical",
        description: ""
    },
]

//controlers
export interface IListController {
    controller_id: number
    locker_id: number
    name: string
    serie: string
    create_at: string
}
export interface IDataTableController {
    paginate: IPagination
    controllers: IListController[]
    sort: ISort
}

export const initialStateDataTableController: IDataTableController = {
    paginate: initialPagination,
    sort: {
        active: "create_at",
        direction: "asc"
    },
    controllers: []
}
//////
export interface ILocker {
    locker_id: number
    type_locker_id: number
    name: string
    address: string
    state: number
}

export const initialStateLocker: ILocker = {
    locker_id: -1,
    type_locker_id: 1,
    name: '',
    address: '',
    state: -1,
}

/////
export interface IController {
    controller_id: number
    locker_id: number
    name: string
    serie: string
    create_at?: string
}
export const initialStateController: IController = {
    controller_id: -1,
    locker_id: -1,
    name: "",
    serie: "",
    create_at: ""
}