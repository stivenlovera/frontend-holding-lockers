import { Injectable } from "@angular/core"
import { MatPaginatorIntl } from "@angular/material/paginator"
import { Subject } from "rxjs"

@Injectable()
export class PaginateTraslate implements MatPaginatorIntl {
    changes = new Subject<void>()
    firstPageLabel = 'Primera Página'
    itemsPerPageLabel = 'Registros por página'
    lastPageLabel = 'Ultima Página'
    nextPageLabel = 'Siguiente'
    previousPageLabel = 'Anterior '

    getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0) {
            return `página 1 - 1 de 1`
        }
        const amountPages = Math.ceil(length / pageSize)
        return `Página ${page + 1} - ${amountPages} de ${length}`
    }
}

export interface IPagination {
    length: number
    pageSize: number
    pageIndex: number
    PageSizeOption: number[]
}

export const initialPagination: IPagination = {
    length: 0,
    pageSize: 10,
    pageIndex: 0,
    PageSizeOption: [10, 25, 50, 100]
}