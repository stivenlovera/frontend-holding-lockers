import { initialPagination, IPagination } from "app/shared/paginator.traslate"
import { ISort } from "app/utils/util.types"
import { User } from "app/core/user/user.types"

export interface IBuilding {
    building_id: number
    company_id: number
    name: string
    address: string
    phone: string
    manager: string
    code: string
}

export interface ICompany {
    company_id: number
    name: string
    address: string
    owner: string
}

export interface ListCardProps {
    buildings: IBuilding[]
    users: User[]
}

export const initialStateBuilding: IBuilding = {
    building_id: null,
    company_id: 1,
    name: "",
    address: "",
    code: "",
    phone: "",
    manager: ""
}

export interface IListApiIntegration {
    api_integration_id: number
    building_id: number
    api_url: string
    name_function: string
    description: string
    time_ejecution: number
    is_job: number
}

export interface IDataTableApiIntegration {
    paginate: IPagination
    apiIntegrations: IListApiIntegration[]
    sort: ISort
}

export const initialStateDataTableApiIntegration: IDataTableApiIntegration = {
    paginate: initialPagination,
    sort: {
        active: "create_at",
        direction: "asc"
    },
    apiIntegrations: [{
        api_integration_id: 0,
        building_id: 0,
        api_url: "asd",
        name_function: "asd",
        description: "asd",
        time_ejecution: 0,
        is_job: 0
    }]
}