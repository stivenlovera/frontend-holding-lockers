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
        active: "fecha_entrega",
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
    /** 1 si la entrega (allocated) se notificó a Holding. */
    holding_enviada: number
    /** 1 si el retiro o la intervención (collected) se notificó a Holding. */
    holding_confirmada: number
    /** 1 si la entrega ya tiene retiro o intervención. */
    cerrado: number
    /** 1 si la notificación por WhatsApp de la entrega se envió. */
    whatsapp_enviado: number
    /** Fecha (UTC) de la entrega. */
    fecha_entrega: string
    /** Fecha (UTC) del retiro o la intervención; null si sigue pendiente. */
    fecha_cierre: string | null
    /** 2 = retiro, 4 = intervención; null si sigue pendiente. */
    tipo_cierre: number | null
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
export interface IInterventionActivity extends IActivity {
    usuario: string | null
    observacion: string | null
}
export interface IDetailedActivity {
    entrada: IActivity | null
    salida: IActivity | null
    intervenido: IInterventionActivity | null
}
export const initialStateDetailedActivity: IDetailedActivity = {
    entrada: initialStateActivity,
    salida: initialStateActivity,
    intervenido: null
}
