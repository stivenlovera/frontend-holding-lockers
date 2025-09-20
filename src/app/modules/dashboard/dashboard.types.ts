export interface CardLockerProps {
    lockers: Locker[]
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

export interface CardLockerProps {
    lockers: Locker[]
}

export const inizializeStateCardLockerProps: CardLockerProps = {
    lockers: []
}