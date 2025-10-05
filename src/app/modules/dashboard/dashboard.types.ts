import { initialPagination, IPagination } from "app/shared/paginator.traslate"
import { ISort } from "app/utils/util.types"

export interface IUserCard {
    id: number
    name: string
    email: string
    celular: string
}
export interface CardLockerProps {
    lockers: Locker[]
    users: IUserCard[]
}

export interface Locker {
    locker_id: number
    address: string
    name: string
    doors: Door[]
}

export interface Door {
    door_id: number
    door_size_id: number
    controller_id: number
    number: number
    channel: string
    orden: number
    state: number
}

export const inizializeStateCardLockerProps: CardLockerProps = {
    lockers: [],
    users: []
}

export interface ITypeLocker {
    create_at: string
    description: string
    name: string
    type_locker_id: -1
}

export interface IRequerimentLocker {
    type_lockers: ITypeLocker[]
}

export const requerimentLocker: IRequerimentLocker = {
    type_lockers: []
}

