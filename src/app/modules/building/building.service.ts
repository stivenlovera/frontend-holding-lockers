import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse, ISort } from 'app/utils/util.types';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { IPagination } from 'app/shared/paginator.traslate';
import { IBuilding, IDataTableApiIntegration, ListCardProps } from './building.types';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  listBuilding(): Observable<IResponse<ListCardProps>> {
    const response = this._httpClient
      .get<IResponse<ListCardProps>>(
        `${environment.apiUrl}/building/dashboard-building`,
      );
    return response;
  }


  public buildingStore(user: IBuilding): Observable<IResponse<IBuilding>> {
    const response = this._httpClient
      .post<IResponse<IBuilding>>(
        `${environment.apiUrl}/building`, user
      );
    return response;
  }

  public buildingUpdate(user: IBuilding): Observable<IResponse<IBuilding>> {
    const response = this._httpClient
      .put<IResponse<IBuilding>>(
        `${environment.apiUrl}/building/${user.building_id}`, user
      );
    return response;
  }

  public buildingEdit(user_id: number): Observable<IResponse<IBuilding>> {
    const response = this._httpClient
      .get<IResponse<IBuilding>>(
        `${environment.apiUrl}/building/${user_id}`,
      );
    return response;
  }

  public buildingDelete(user_id: number): Observable<IResponse<IBuilding>> {
    const response = this._httpClient
      .delete<IResponse<any>>(
        `${environment.apiUrl}/building/${user_id}`,
      );
    return response;
  }

  public getDataTableApiIntegration(building_id: number, { length, pageIndex, pageSize }: IPagination, { active, direction }: ISort): Observable<IResponse<IDataTableApiIntegration>> {
    const response = this._httpClient
      .post<IResponse<IDataTableApiIntegration>>(
        `${environment.apiUrl}/api-integration/data-table`,
        {
          length,
          pageIndex,
          pageSize,
          active,
          direction,
          building_id
        }
      );
    return response;
  }
}
