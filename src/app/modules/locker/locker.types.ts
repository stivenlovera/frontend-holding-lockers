export interface ILocker {
    locker_id: number
    client_id: number
    macAdd: string
    address: string
    state: number
    doors: IDoor[]
}

export interface IDoor {
    door_id: number
    door_size_id: number
    controller_id: number
    number: number
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

export const colorDoor = {
    available: 'bg-neutral-500',
    notAvailable: 'bg-emerald-800'
}

export const inizializeStateLocker: ILocker = {
    locker_id: -1,
    client_id: -1,
    macAdd: "",
    address: "",
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