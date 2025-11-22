import { Injectable } from '@angular/core';
import { IResponse, ISort } from 'app/utils/util.types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { IDataTableMovement, IDetailedActivity } from './movement.type';
import { IPagination } from 'app/shared/paginator.traslate';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getDataTableMovement(locker_id: number, { length, pageIndex, pageSize }: IPagination, { active, direction }: ISort): Observable<IResponse<IDataTableMovement>> {
    const response = this._httpClient
      .post<IResponse<IDataTableMovement>>(
        `${environment.apiUrl}/movement/data-table`,
        {
          locker_id,
          length,
          pageIndex,
          pageSize,
          active,
          direction
        }
      );
    return response;
  }

  getDetailedActivity(id_ref: string): Observable<IResponse<IDetailedActivity>> {
    const response = this._httpClient
      .post<IResponse<IDetailedActivity>>(
        `${environment.apiUrl}/movement/detailed-movement`,
        {
          id_ref,
        }
      );
    return response;
  }
}
